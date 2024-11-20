import { Component } from '@angular/core';
import { getLine, questions as baseQuestions, setLanguage } from '../../unsorted/configuration';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerValue, Axis, Question, SpecialAxis } from '../../datamodel/questionsConfiguration';

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
    this.answers.push(answer);

    if (this.question_number >= this.questions.length) {
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

    // TODO calculate parameters of url and redirect
  }

  simulate() {
    // TODO
  }
}
