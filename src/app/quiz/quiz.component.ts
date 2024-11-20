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
    for (let j, i = questions.length; i>0; i--) {
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

    for (var i in this.questions) {
      const question = this.questions[i];
      const answer = this.answers[i];

      function tallyValues(values: AnswerValue[], toggle: number) {
        for (const value of values) {
          const axis = value.axis;
          let data;
          if (axes.has(axis)) {
            data = axes.get(axis)!;
          } else {
            data = {val: 0, sum: 0};
            axes.set(axis, data);
          }

          if (toggle * answer > 0) {
            data.val += toggle * answer * value.value;
          }
          data.sum += Math.max(value.value, 0);
        }
      }
      tallyValues(question.valuesYes, 1);
      tallyValues(question.valuesNo, -1);
    }

    // TODO calculate parameters of url and redirect
  }

  simulate() {
    // TODO
  }
}
