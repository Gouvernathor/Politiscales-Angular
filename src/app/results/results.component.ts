import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getLine, setLanguage } from '../../unsorted/configuration';
import { ActivatedRoute } from '@angular/router';
import { Axis, getAxisFromId, getIdsAndAxes, SpecialAxis } from '../../datamodel/questionsConfiguration';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  localize = getLine;
  private axesData = new Map<Axis | SpecialAxis, number>();
  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    let lang: string;
    lang = (await firstValueFrom(this.route.data))["lang"];
    if (lang) {
      setLanguage(lang);
    }

    // TODO remplissage de #urlToCopy avec l'url actuel

    const params = this.route.snapshot.paramMap;
    for (const [key, axis] of getIdsAndAxes()) {
      let value = 0;
      const rawVal = params.get(key);
      if (rawVal !== null) {
        const ivalue = parseInt(rawVal);
        if (!isNaN(ivalue)) {
          value = ivalue/100;
        }
      }
      this.axesData.set(axis, value);
    }

    for (const axis of this.axesData.keys()) {
      if (axis in Axis && axis > 0) {
        let negativeValue = this.axesData.get(-axis as Axis);
        let positiveValue = this.axesData.get(axis);

        // TODO continue
      }
    }
  }
}
