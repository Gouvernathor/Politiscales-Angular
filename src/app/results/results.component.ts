import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getLine, setLanguage } from '../../services/localizationService';
import { ActivatedRoute } from '@angular/router';
import { flagShapes } from '../../services/flagConfigurationService';
import { AnyAxis, Axis, BaseAxis, SpecialAxis } from '../../datamodel/commonConfiguration';
import { getIdsAndAnyAxes, getIdsAndBaseAxes, getIdsAndSpecialAxes } from '../../services/commonConfigurationService';
import { getBonusThreshold, getSlogan } from '../../services/resultsConfigurationService';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  localize = getLine;
  private axesData = new Map<AnyAxis, number>();
  private axesValues = new Map<BaseAxis, number>();
  private generatedSlogan = "";
  constructor(private route: ActivatedRoute) {}

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
    const params = this.route.snapshot.paramMap;
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
    for (const [bid, baseAxis] of getIdsAndBaseAxes()) {
      // very confusing : the "positive" is the "bad" one, the "0", the one with a negative enum value in this system
      // should be "left" vs "right", from both political and visual points of view
      const negativeValue = this.axesData.get(+baseAxis as Axis)!;
      const positiveValue = this.axesData.get(-baseAxis as Axis)!;
      this.setAxisValue(`${bid}AxisNeg`, negativeValue);
      this.setAxisValue(`${bid}AxisPos`, positiveValue);
      this.setAxisValue(`${bid}AxisMid`, 1-negativeValue-positiveValue);

      if (negativeValue<positiveValue) {
        characteristicsMap.set(+baseAxis, negativeValue);
      } else {
        characteristicsMap.set(-baseAxis, positiveValue);
      }

      this.axesValues.set(baseAxis, positiveValue-negativeValue);
    }

    let bonusEnabled = false;
    for (const [id, axis] of getIdsAndSpecialAxes()) {
      const value = this.axesData.get(axis)!;
      const thresh = getBonusThreshold(axis as SpecialAxis);

      this.setBonus(`${id}Bonus`, value, thresh);

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

      const sortedAxesWithSlogans = [...sloganMap.keys()]
        .sort((a, b) => characteristicsMap.get(b)! - characteristicsMap.get(a)!);

      this.generatedSlogan = sortedAxesWithSlogans.slice(0, 3).map(a => sloganMap.get(a)!).join(" · ");

      // TODO
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

  private setAxisValue(id: string, value: number) {
    // TODO
    // To be replaced by direct access from the html
    // gets the #{id} element
    // gets the #{id}Text element
    // sets the axis element's width to {100*value}%
    // sets the text to the same value (rounded to the percent)
    // sets the text visibility CSS rule to "hidden" or "visible",
    // based on the offsetWidths of the two elements
  }

  private setBonus(id: string, value: number, limit: number) {
    // TODO
    // To be replaced by direct access from the html
    // gets the #{id} element
    // if the value is greater than the limit, set its display to block
    // and its opacity to value*value
    // if not, hides the element
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

  private shareFacebook() {
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

  // TODO extract uses for the flagConfigurationService constants
  // and export them as functions only, protecting the arrays
  // also add typing in datamodel/flagConfiguration
}
