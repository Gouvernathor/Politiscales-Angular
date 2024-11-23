import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getLine, setLanguage } from '../../services/localizationService';
import { ActivatedRoute, Router } from '@angular/router';
import { flagColors, flagShapes } from '../../services/flagConfigurationService';
import { AnyAxis, Axis, BaseAxis, SpecialAxis } from '../../datamodel/commonConfiguration';
import { getAnyAxisFromId, getBaseAxisFromId, getIdsAndAnyAxes } from '../../services/commonConfigurationService';
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
  // TODO segregate the final values between Axes and SpecialAxes
  // only store the special axis if above the threshold, and store the square/opacity value
  axesData = new Map<AnyAxis, number>();
  private axesValues = new Map<BaseAxis, number>();
  generatedSlogan = "";
  private characteristicsMap!: Map<AnyAxis, number>;
  bonusEnabled = false; // TODO make it a property on the SpecialAxis storage (once fully segregated)
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
    // similar to axesData but without the minor direction of each base axis
    // (favoring "bad" directions in case of tie)
    this.characteristicsMap = new Map();
    for (const baseAxis of getAllEnumValues(BaseAxis)) {
      const leftValue = this.axesData.get(+baseAxis as Axis)!;
      const rightValue = this.axesData.get(-baseAxis as Axis)!;

      if (leftValue > rightValue) {
        this.characteristicsMap.set(+baseAxis, leftValue);
      } else {
        this.characteristicsMap.set(-baseAxis, rightValue);
      }

      this.axesValues.set(baseAxis, rightValue-leftValue);
    }

    for (const axis of getAllEnumValues(SpecialAxis)) {
      const value = this.axesData.get(axis)!;
      const thresh = getBonusThreshold(axis);

      if (value > thresh) {
        this.bonusEnabled = true;
        this.characteristicsMap.set(axis, value);
      }
    }

    const sloganMap = new Map<AnyAxis, string>();
    for (const [axis, value] of this.characteristicsMap.entries()) {
      const slogan = getSlogan(axis);
      if (value > 0 && slogan) {
        sloganMap.set(axis, slogan);
      }
    }

    this.generatedSlogan = sorted(sloganMap.keys(), a => -this.characteristicsMap.get(a)!)
      .slice(0, 3).map(a => sloganMap.get(a)!).join(" · ");

    // twitterbutton
    // redditButton

    // TODO
    // loop on images with onload callback,
    // call to onImageLoaded when all callbacks are done

    // TODO continue
  }

  /**
   * @returns a sorted array of pairs of colors (one bg, one fg)
   * Starting from the constant flagColors.
   * Each has a list of conditions : an acceptable range of values for an AnyAxis.
   * All of the conditions must be met for the color to be kept.
   * The first condition of a list of condition gives the main axis of the color.
   * The remaining colors are then sorted by the (presumably decreasing) value of the main axis of the color.
   * All provided objects are guaranteed to be created in the function with no possible side-effect.
   */
  private findFlagColors(): {bgColor: string, fgColor: string}[] {
    const me = this;
    function getColorMainValue(flagColor: typeof flagColors[0]) {
      let mainValue = undefined;
      for (const cond of flagColor.cond) {
        const axis = getAnyAxisFromId(cond.name);
        if (axis !== undefined) {
          const value = me.characteristicsMap.get(axis);
          if (value !== undefined) {
            if (cond.vmin < value && value < cond.vmax) {
              if (mainValue === undefined) {
                mainValue = value;
              }
              continue;
            }
          }
        }
        return;
      }
      return mainValue;
    }

    return flagColors
      .map(fc => ({bgColor: fc.bgColor, fgColor: fc.fgColor, value: getColorMainValue(fc)}))
      .filter(fc => fc.value !== undefined)
      .sort((a, b) => b.value!-a.value!);
  }

  private findFlagShape(numColors: number) {
    let flagFound = undefined;
    let flagValue = [0, 0, 0];
    let flagColor = 0;

    for (let i = 0; i < flagShapes.length; i++) {
      const flagShape = flagShapes[i];
    // for (const flagShape of flagShapes) {
      if (flagShape.numColors > numColors) {
        continue;
      }

      let condValue = [0, 0];
      let accepted = true;

      for (let j = 0; j < flagShape.cond.length; j++) {
        const cond = flagShape.cond[j];
      // for (const cond of flagShape.cond) {
        const baseAxis = getBaseAxisFromId(cond.name);
        if (baseAxis !== undefined) {
          const value = this.axesValues.get(baseAxis);
          if (value !== undefined) {
            if (value < cond.vmin || value > cond.vmax) {
              accepted = false;
            }
            if (j < 3) {
              condValue[j] = Math.abs(value);
            }
          } else {
            accepted = false;
          }
        } else {
          accepted = false;
        }

        if (!accepted) {
          break;
        }
      }

      if (accepted && flagColor <= flagShape.numColors) {
        if (flagShape.numColors > flagColor) {
          flagColor = flagShape.numColors;
          [...flagValue] = condValue.slice(0, 3);
          flagFound = i;
        } else if (condValue[0] > flagValue[0]) {
          flagColor = flagShape.numColors;
          [...flagValue] = condValue.slice(0, 3);
          flagFound = i;
        } else if (condValue[0] === flagValue[0]) {
          if (condValue[1] > flagValue[1]) {
            flagColor = flagShape.numColors;
            [...flagValue] = condValue.slice(0, 3);
            flagFound = i;
          } else if (condValue[1] === flagValue[1]) {
            if (condValue[2] > flagValue[2]) {
              flagColor = flagShape.numColors;
              [...flagValue] = condValue.slice(0, 3);
              flagFound = i;
            }
          }
        }
      }
    }

    return flagFound;
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

      const colors = this.findFlagColors();
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
