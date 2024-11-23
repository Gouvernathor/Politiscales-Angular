import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getLine, setLanguage } from '../../services/localizationService';
import { ActivatedRoute, Router } from '@angular/router';
import { flagShapes } from '../../services/flagConfigurationService';
import { AnyAxis, Axis, BaseAxis, SpecialAxis } from '../../datamodel/commonConfiguration';
import { getIdsAndAnyAxes, getIdsAndSpecialAxes } from '../../services/commonConfigurationService';
import { getBonusThreshold, getSlogan } from '../../services/resultsConfigurationService';
import { sorted } from '../../util/utils';
import { VisibilityDirective } from './visibility.directive';
import { getAllEnumValues } from 'enum-for';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [VisibilityDirective],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  localize = getLine;
  getBonusThreshold = getBonusThreshold;
  BaseAxis = BaseAxis;
  Axis = Axis;
  SpecialAxis = SpecialAxis;
  axesData = new Map<AnyAxis, number>();
  private axesValues = new Map<BaseAxis, number>();
  private generatedSlogan = "";
  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    let lang: string;
    lang = (await firstValueFrom(this.route.data))["lang"];
    if (lang) {
      setLanguage(lang);
    }

    // TODO remplissage de #urlToCopy avec l'url actuel

    this.storeAxesData();
    this.applyResults();
  }

  private storeAxesData() {
    const params = this.route.snapshot.queryParamMap;
    for (const [id, axis] of getIdsAndAnyAxes()) {
      let value = 0;
      const rawVal = params.get(id);
      if (rawVal !== null) {
        const ivalue = parseInt(rawVal);
        if (!isNaN(ivalue)) {
          value = ivalue/100;
        }
      }
      this.axesData.set(axis, value);
    }
  }

  private applyResults() {
    const characteristicsMap = new Map<AnyAxis, number>(); // similar to axesData but without the minor direction of each base axis (favoring "bad" directions)
    for (const baseAxis of getAllEnumValues(BaseAxis)) {
      const leftValue = this.axesData.get(+baseAxis as Axis)!;
      const rightValue = this.axesData.get(-baseAxis as Axis)!;

      if (leftValue<rightValue) {
        characteristicsMap.set(+baseAxis, leftValue);
      } else {
        characteristicsMap.set(-baseAxis, rightValue);
      }

      this.axesValues.set(baseAxis, rightValue-leftValue);
    }

    let bonusEnabled = false;
    for (const [id, axis] of getIdsAndSpecialAxes()) {
      const value = this.axesData.get(axis)!;
      const thresh = getBonusThreshold(axis);

      if (value > thresh) {
        bonusEnabled = true;
        characteristicsMap.set(axis, value);
      }
    }

    const sloganDiv = null!; //  #slogan element
    if (sloganDiv) {
      const sloganMap = new Map<AnyAxis, string>();
      for (const [axis, value] of characteristicsMap.entries()) {
        const slogan = getSlogan(axis);
        if (value > 0 && slogan) {
          sloganMap.set(axis, slogan);
        }
      }

      // FIXME weird, comparison should probably go the other way around
      this.generatedSlogan = sorted(sloganMap.keys(), a => characteristicsMap.get(a)!)
        .slice(0, 3).map(a => sloganMap.get(a)!).join(" · ");

      // TODO in the html file
      // sloganDiv.innerHTML = this.generatedSlogan;
    }

    if (!bonusEnabled) {
      // TODO
      // hide #bonusBox
    }

    // twitterbutton
    // redditButton

    // TODO
    // loop on images with onload callback,
    // call to onImageLoaded when all callbacks are done

    // TODO continue
  }

  private findFlagColors() {
    // TODO
  }

  private findFlagShape(numColors: number) {
    // TODO
  }

  private getCharacteristic(name: never, vmin: never, vmax: never) {
    // TODO
  }

  private findFlagSymbol(numColors: number) {
    // TODO
  }

  shareLink() {
    // TODO
  }

  shareFacebook() {
    // TODO
  }

  private onAllImagesLoaded() {
    const flag: any = null!; // #generatedFlag element
    if (flag) {
      const ctx = flag.getContext("2d");

      let spriteX = 256,
          spriteY = 128,
          spriteS = 1.0;

      const colors: any[] = this.findFlagColors()!; // TODO type and remove bang
      const symbolData = this.findFlagSymbol(colors.length);

      const flagId: number = this.findFlagShape(colors.length)!; // TODO type and remove bang

      if (colors.length <= 0) {
        // TODO maybe do this in findFlagColors() ???
        colors.push({bgColor: "#fff", fgColor: "#000"});
      }

      if (flagId < 0) {
        // TODO
        // draw a rectangle (0, 0, 512, 256) filled with "#fff"
      } else {
        const flagShape = flagShapes[flagId];
        for (const path of flagShape.shapes) {
          const numPoints = path.length/2;

          // TODO
          // draw a SVG path
        }

        spriteX = flagShape.symbol[0]*512;
        spriteY = flagShape.symbol[1]*256;
        spriteS = flagShape.symbol[2];
      }

      // TODO continue
    }
  }

  debug() {
    // TODO (maybe)
  }

  gotoQuiz() {
    this.router.navigate(['..', 'quiz'], {relativeTo: this.route});
  }

  // TODO extract uses for the flagConfigurationService constants
  // and export them as functions only, protecting the arrays
  // also add typing in datamodel/flagConfiguration
}
