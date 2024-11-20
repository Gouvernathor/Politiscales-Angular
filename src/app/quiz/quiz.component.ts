import { Component } from '@angular/core';
import { getLine, questions as baseQuestions, setLanguage } from '../../unsorted/configuration';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../datamodel/questionsConfiguration';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  localize = getLine;
  private question_number: number; // TODO make a property, computed from answers ?
  private readonly questions: Question[];
  constructor(private route: ActivatedRoute) {
    this.question_number = 0;

    let questions = baseQuestions.slice();
    for (let j, i = questions.length; i>0; i--) {
      j = Math.floor(Math.random()*(i+1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    this.questions = questions;
  }

  async ngOnInit() {
    let lang: string;
    lang = (await firstValueFrom(this.route.data))["lang"];
    if (lang) {
      setLanguage(lang);
    }

    this.initQuestion();
  }

  private initQuestion() {
    // TODO
  }

  answer(answer: any) {
    // TODO (previously next_question)
  }

  prevQuestion() {
    // TODO
  }

  gotoResults() {
    // TODO (previously results)
  }

  simulate() {
    // TODO
  }
}
