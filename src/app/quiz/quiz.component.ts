import { Component } from '@angular/core';
import { getLine, questions as baseQuestions, setLanguage } from '../../unsorted/configuration';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AnswerValue, Axis, getAxisId, Question, SpecialAxis } from '../../datamodel/questionsConfiguration';

type Answer = any;

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  localize = getLine;
  loading = true;
  readonly questions: Readonly<Question[]>;
  readonly answers: Answer[];
  constructor(private route: ActivatedRoute, private router: Router) {
    let questions = baseQuestions.slice();
    for (let j, i = questions.length-1; i>0; i--) {
      j = Math.floor(Math.random()*(i+1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    this.questions = questions;
    this.answers = [];
  }

  async ngOnInit() {
    let lang: string;
    lang = (await firstValueFrom(this.route.data))["lang"];
    if (lang) {
      setLanguage(lang);
    }

    this.loading = false;
  }

  get question_number() {
    return this.answers.length;
  }

  answer(answer: Answer) {
    this.loading = this.question_number+1 >= this.questions.length;
    this.answers.push(answer);

    if (this.loading) {
      this.gotoResults();
    }
  }

  prevQuestion() {
    this.answers.pop();
  }

  gotoStart() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  gotoResults() {
    this.loading = true;

    const axes = new Map<Axis|SpecialAxis, {val: number, sum: number}>();

    function tallyValues(values: AnswerValue[], toggledAnswer: number) {
      for (const value of values) {
        const axis = value.axis;
        let data;
        if (axes.has(axis)) {
          data = axes.get(axis)!;
        } else {
          data = {val: 0, sum: 0};
          axes.set(axis, data);
        }

        if (toggledAnswer > 0) {
          data.val += toggledAnswer * value.value;
        }
        data.sum += Math.max(value.value, 0);
      }
    }

    for (let i=0; i<this.questions.length; i++) {
      const question = this.questions[i];
      const answer = this.answers[i];
      tallyValues(question.valuesYes, answer * 1);
      tallyValues(question.valuesNo, answer * -1);
    }

    const queryParams: Params = {};
    for (const [axis, data] of axes.entries()) {
      queryParams[getAxisId(axis)!] = (100 * data.val / data.sum).toFixed(0);
    }
    this.router.navigate(['..', 'results'], {relativeTo: this.route, queryParams: queryParams});
  }

  simulate() {
    const randPerAbsAxis = new Map([...new Set(this.questions
          .flatMap(q => q.valuesYes.map(v => v.axis)) // get all axes or special axes
          .filter(a => 0 < a && a in Axis) // filter out special axes
        )] // get unique elements
      .map(a => [a, Math.random()])); // generate a random number for each axis

    function operate(props: number[], values: AnswerValue[], toggle: number) {
      for (const value of values) {
        const axis = value.axis;
        const rand = randPerAbsAxis.get(Math.abs(axis));
        if (rand !== undefined) {
          props.push(rand * toggle * (axis > 0 ? axis : -axis));
        }
      }
    }

    while (!this.loading) {
      if (Math.random() < .1) {
        this.answer(0);
      } else {
        let props: number[] = [];
        const question = this.questions[this.question_number];
        operate(props, question.valuesYes, 1);
        operate(props, question.valuesNo, -1);

        // questions with only special axes have .5 chance
        if (Math.random() < (props.length !== 0 ? props.reduce((a, b) => a + b) : .5)) {
          this.answer(1);
        } else {
          this.answer(-1);
        }
      }
    }

    // simpler version, full-random
    // while (!this.loading) {
    //   this.answer([-1, -2/3, 0, 2/3, 1][Math.floor(Math.random()*5)]);
    // }
  }
}
