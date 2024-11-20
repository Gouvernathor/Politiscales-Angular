import { Component } from '@angular/core';
import { getLine, questions as baseQuestions, setLanguage } from '../../unsorted/configuration';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Axis, Question, SpecialAxis } from '../../datamodel/questionsConfiguration';

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

    const valPerAxis = new Map<Axis|SpecialAxis, number>();
    const sumPerAxis = new Map<Axis|SpecialAxis, number>();

    for (var i in this.questions) {
      const question = this.questions[i];
      const answer = this.answers[i];

      for (const valueYes of question.valuesYes) {
        const axis = valueYes.axis;

        if (answer > 0) {
          valPerAxis.set(axis, (valPerAxis.get(axis)||0) + answer * valueYes.value);
        }
        sumPerAxis.set(axis, (sumPerAxis.get(axis)||0) + Math.max(valueYes.value, 0));
      }

      for (const valueNo of question.valuesNo) {
        const axis = valueNo.axis;

        if (answer < 0) {
          valPerAxis.set(axis, (valPerAxis.get(axis)||0) - answer * valueNo.value);
        }
        sumPerAxis.set(axis, (sumPerAxis.get(axis)||0) + Math.max(valueNo.value, 0));
      }
    }

    // TODO calculate parameters of url and redirect
  }

  simulate() {
    // TODO
  }
}
