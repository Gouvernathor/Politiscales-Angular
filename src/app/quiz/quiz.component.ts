import { Component } from '@angular/core';
import { getLine, setLanguage } from '../../services/localizationService';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AnswerValue, Question } from '../../datamodel/questionsConfiguration';
import { AnyAxis, Axis, BaseAxis, SpecialAxis } from '../../datamodel/commonConfiguration';
import { getAnyAxisId } from '../../services/commonConfigurationService';
import { getQuestions } from '../../services/questionsConfigurationService';
import { getAllEnumValues } from 'enum-for';
import { hashString, RNG } from '../../util/utils';

type Answer = number;

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
  private readonly rng: RNG = new RNG();
  questions!: Readonly<Question[]>;
  readonly answers: Answer[] = [];
  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    // manage language
    let lang: string;
    if (lang = (await firstValueFrom(this.route.data))["lang"]) {
      setLanguage(lang);
    }

    // seed the rng
    const params = this.route.snapshot.queryParamMap;
    const seedstring = params.get("seed");
    if (seedstring !== null) {
      let seed = parseInt(seedstring);
      if (isNaN(seed)) {
        seed = hashString(seedstring);
      }
      this.rng.seed = seed;
    }

    // generate questions
    let questions = getQuestions().slice();
    for (let j, i=questions.length-1; i>0; i--) {
      j = this.rng.randRange(0, i+1);
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    this.questions = questions;

    // loading is done
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
    const tally = new Map<AnyAxis, {val: number, sum: number}>(
      [...getAllEnumValues(Axis), ...getAllEnumValues(SpecialAxis)]
        .map(a => [a, {val: 0, sum: 0}]));

    function tallyValues(values: AnswerValue[], toggledAnswer: number) {
      for (const value of values) {
        const data = tally.get(value.axis)!;

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
    for (const [axis, data] of tally.entries()) {
      queryParams[getAnyAxisId(axis)] = (100 * data.val / data.sum).toFixed(0);
    }
    // FIXME the generated queryParams may not match the original
    this.router.navigate(['..', 'results'], {relativeTo: this.route, queryParams: queryParams});
  }

  simulate() {
    const randPerBaseAxis = new Map(getAllEnumValues(BaseAxis)
      .map(a => [a, Math.random()]));

    function operate(props: number[], values: AnswerValue[], invert: boolean) {
      for (const value of values) {
        const axis = value.axis;
        const rand = randPerBaseAxis.get(Math.abs(axis) as BaseAxis);
        if (rand !== undefined) {
          props.push((invert === (axis > 0)) ? rand : 1-rand);
        }
      }
    }

    while (!this.loading) {
      if (Math.random() < .1) {
        this.answer(0);
      } else {
        let props: number[] = [];
        const question = this.questions[this.question_number];
        operate(props, question.valuesYes, false);
        operate(props, question.valuesNo, true);

        // questions with only special axes have .5 chance
        if (Math.random() < (props.length !== 0 ? props.reduce((a, b) => a + b)/props.length : .5)) {
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
