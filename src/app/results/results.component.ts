import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getLine, setLanguage } from '../../services/localizationService';
import { ActivatedRoute, Router } from '@angular/router';
import { FlagColor, flagColors, FlagShape, flagShapes, FlagSymbolDataParentType, flagSymbols, FlagSymbolTransform } from '../../services/flagConfigurationService';
import { AnyAxis, Axis, BaseAxis, SpecialAxis } from '../../datamodel/commonConfiguration';
import { getAnyAxisFromId, getBaseAxisFromId, getIdsAndAnyAxes } from '../../services/commonConfigurationService';
import { getBonusThreshold, getSlogan } from '../../services/resultsConfigurationService';
import { arrayCmp, sorted } from '../../util/utils';
import { VisibilityDirective } from './visibility.directive';
import { getAllEnumValues } from 'enum-for';

// TODO typing for the findFlagSymbol method, to be refined
type NoneSymbol = {
  parent_type: null,
  transform: {
    main: false,
  },
};
type Symbol = {
  parent_type: FlagSymbolDataParentType,
  transform: FlagSymbolTransform,
};

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
    if (lang = (await firstValueFrom(this.route.data))["lang"]) {
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

    this.generatedSlogan = this.generateSlogan();

    // twitterbutton
    // redditButton

    // TODO
    // loop on images with onload callback,
    // call to onImageLoaded when all callbacks are done

    // TODO continue
  }

  private generateSlogan() {
    const sloganMap = new Map<AnyAxis, string>();
    for (const [axis, value] of this.characteristicsMap.entries()) {
      const slogan = getSlogan(axis);
      if (value > 0 && slogan) {
        sloganMap.set(axis, slogan);
      }
    }

    return sorted(sloganMap.keys(), a => -this.characteristicsMap.get(a)!)
      .slice(0, 3).map(a => sloganMap.get(a)!).join(" · ");
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
    function getColorMainValue(flagColor: FlagColor) {
      let mainValue = undefined;
      for (const cond of flagColor.cond) {
        const axis = getAnyAxisFromId(cond.name);
        if (axis !== undefined) {
          const value = me.characteristicsMap.get(axis);
          if (value !== undefined) {
            if (cond.vmin <= value && value <= cond.vmax) {
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

  /**
   * Returns an optional member of flagShapes.
   * The flagShape must have a numColors lower or equal to the passed numColors.
   * Each flagShape has a series of conditions : an acceptable range of values for a BaseAxis in axesValues.
   * All of the conditions must be met for the flagShape to be eligible.
   * Each flagShape has (up to) three flagValues, which are the absolute values of the BaseAxis of the (up to) three first conditions.
   * The winning flagShap is the one with the most numColors,
   * then with the highest value of the BaseAxis of its first condition,
   * then of its second, and so on (with the most number of conditions winning in case of a tie).
   */
  private findFlagShape(numColors: number): Pick<FlagShape, "symbol"|"shapes">|undefined {
    const me = this;
    function getConditionValues(flagShape: FlagShape): number[]|undefined {
      let condValues = [];
      for (const cond of flagShape.cond) {
        const baseAxis = getBaseAxisFromId(cond.name);
        if (baseAxis !== undefined) {
          const value = me.axesValues.get(baseAxis);
          if (value !== undefined) {
            if (cond.vmin <= value && value <= cond.vmax) {
              condValues.push(Math.abs(value));
              continue;
            }
          }
        }
        return;
      }
      return condValues;
    }

    return flagShapes
      .map((fs, i) => ({...fs, index: i}))
      .filter(fs => fs.numColors <= numColors)
      .map(fs => ({...fs, flagValues: getConditionValues(fs)}))
      .filter(fs => fs.flagValues !== undefined)
      .sort((a, b) => arrayCmp(b.flagValues!, a.flagValues!))
      .sort((a, b) => b.numColors-a.numColors)
      [0];
  }

  // TODO make it return undefined instead of -1
  // private getCharacteristic(name: string, vmin: number, vmax: number) {
  private getCharacteristic({name, vmin, vmax}: {name: string, vmin: number, vmax: number}) {
    const axis = getAnyAxisFromId(name);
    if (axis !== undefined) {
      const value = this.characteristicsMap.get(axis);
      if (value !== undefined) {
        if (vmin <= value && value <= vmax) {
          return value;
        }
      }
    }
    return undefined;
  }

  /**
   * Returns a major symbol and a minor symbol for the flag.
   * Each is optional, but the alternate is the NoneSymbol instead of undefined.
   * If the second is defined, the first has to be defined too.
   * If the two are defined, then if the second has main to true, the first has to have it to true too.
   */
  private findFlagSymbol(numColors: number): [Symbol|NoneSymbol, Symbol|NoneSymbol] {
    const noneSymbol: NoneSymbol = {
      parent_type: null,
      transform: {
        main: false,
      },
    };

    let symbol0: Symbol|NoneSymbol;
    if (numColors === 0) {
      symbol0 = {
        parent_type: "dot",
        transform: {
          child_type: "none",
          x: 3,
          y: 3,
          main: true,
          parent_tx: 0,
          parent_ty: 0,
          parent_sx: 1,
          parent_sy: 1,
          parent_r: 0,
          child_tx: 0,
          child_ty: 0,
          child_sx: 1,
          child_sy: 1,
          child_r: 0,
        },
      };
    } else {
      symbol0 = noneSymbol;
    }
    let symbol1: Symbol|NoneSymbol = noneSymbol;
    let valueMax = 0;

    for (let s0 = 0; s0 < flagSymbols.length; s0++) {
      const flagSymbol0 = flagSymbols[s0];
      const charVal0 = this.getCharacteristic(flagSymbol0.cond);
      if (charVal0 !== undefined) {
        let value = charVal0*1.5;
        if (value > valueMax) {
          let transform0 = undefined;
          for (const fs0transform of flagSymbol0.data.transforms) {
            if (fs0transform.child_type === "none") {
              transform0 = fs0transform;
            }
          }

          if (transform0 !== undefined) {
            symbol0 = {
              parent_type: flagSymbol0.data.parent_type,
              transform: transform0,
            };
            symbol1 = noneSymbol;
            valueMax = value;
          }
        }

        for (const flagSymbol1 of flagSymbols.slice(s0+1)) {
          let transform0 = undefined;
          let transform1 = undefined;
          for (const fs0transform of flagSymbol0.data.transforms) {
            for (const fs1transform of flagSymbol1.data.transforms) {
              if (flagSymbol0.data.parent_type === fs1transform.child_type
                && flagSymbol1.data.parent_type === fs0transform.child_type) {

                transform0 = fs0transform;
                transform1 = fs1transform;
              }
            }
          }

          if (transform0 !== undefined && transform1 !== undefined) {
            const charVal1 = this.getCharacteristic(flagSymbol1.cond);
            if (charVal1 !== undefined) {
              const value = charVal0 + charVal1;
              if (value > valueMax) {
                symbol0 = {
                  parent_type: flagSymbol0.data.parent_type,
                  transform: transform0,
                };
                symbol1 = {
                  parent_type: flagSymbol1.data.parent_type,
                  transform: transform1,
                };
                valueMax = value;
              }
            }
          }
        }
      }
    }
    if (symbol0.parent_type !== null && symbol1.parent_type !== null && symbol1.transform.main && !symbol0.transform.main) {
      return [symbol1, symbol0];
    } else {
      return [symbol0, symbol1];
    }
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
      const [symbol0, symbol1] = this.findFlagSymbol(colors.length);

      const flagShape = this.findFlagShape(colors.length);

      if (colors.length <= 0) {
        // TODO maybe do this in findFlagColors() ???
        colors.push({bgColor: "#fff", fgColor: "#000"});
      }

      if (flagShape === undefined) {
        // TODO
        // draw a rectangle (0, 0, 512, 256) filled with "#fff"
      } else {
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
