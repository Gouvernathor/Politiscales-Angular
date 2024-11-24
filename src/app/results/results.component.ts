import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getLine, setLanguage } from '../../services/localizationService';
import { ActivatedRoute, Router } from '@angular/router';
import { FlagColor, flagColors, FlagShape, flagShapes, FlagSymbol, FlagSymbolCondition, FlagSymbolDataParentType, flagSymbols, FlagSymbolTransform } from '../../services/flagConfigurationService';
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

    // twitterbutton
    // redditButton

    if (globalThis.document) { // TODO replace uses of document to enable server-side rendering of the canvas
      await this.generateFlagCanvas();
      await this.generateResultsCanvas();
    }
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
      .filter(fs => fs.numColors <= numColors)
      .map(fs => ({...fs, flagValues: getConditionValues(fs)}))
      .filter(fs => fs.flagValues !== undefined)
      .sort((a, b) => arrayCmp(b.flagValues!, a.flagValues!))
      .sort((a, b) => b.numColors-a.numColors)
      [0];
  }

  // TODO make it return undefined instead of -1
  // private getCharacteristic(name: string, vmin: number, vmax: number) {
  private getCharacteristic({name, vmin, vmax}: FlagSymbolCondition) {
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
   * The criteria to maximize are very complex to specify.
   */
  private findFlagSymbol(numColors: number): [Symbol|NoneSymbol, Symbol|NoneSymbol] {
    const me = this;
    const filteredValuedFlagSymbols = flagSymbols
      .map(fs => ({...fs, charVal: me.getCharacteristic(fs.cond)}))
      .filter(fs => fs.charVal !== undefined) as (FlagSymbol & {charVal: number})[];

    const noneSymbol: NoneSymbol = {
      parent_type: null,
      transform: {
        main: false,
      },
    };

    const initialSymbol: Symbol|NoneSymbol = numColors === 0 ?
      {
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
      } :
      noneSymbol;

    let singleSymbol = initialSymbol;
    let singleValueMax = 0;
    for (const flagSymbol of filteredValuedFlagSymbols) {
      const charVal = flagSymbol.charVal;
      const value = charVal*1.5;
      if (value > singleValueMax) {
        const transform = flagSymbol.data.transforms
          // .filter(fsTransform => fsTransform.child_type === "none")
          // .at(-1);
          .findLast(fsTransform => fsTransform.child_type === "none");
          // TODO test if just a find() has good enough results (and scale back to ES2022 compat)

        if (transform !== undefined) {
          singleSymbol = {
            parent_type: flagSymbol.data.parent_type,
            transform: transform,
          };
          singleValueMax = value;
        }
      }
    }

    let doubleSymbol0 = initialSymbol;
    let doubleSymbol1: Symbol|NoneSymbol = noneSymbol;
    let doubleValueMax = 0;
    for (let s0 = 0; s0 < filteredValuedFlagSymbols.length; s0++) {
      const flagSymbol0 = filteredValuedFlagSymbols[s0];
      const charVal0 = flagSymbol0.charVal;
      for (const flagSymbol1 of filteredValuedFlagSymbols.slice(s0+1)) {
        const charVal1 = flagSymbol1.charVal;
        const value = charVal0 + charVal1;
        if (value > doubleValueMax) {
          const transformPair = flagSymbol0.data.transforms
            // .flatMap(fs0transform => flagSymbol1.data.transforms
            //   .filter(fs1transform => flagSymbol0.data.parent_type === fs1transform.child_type
            //     && flagSymbol1.data.parent_type === fs0transform.child_type)
            //   .map(fs1transform => [fs0transform, fs1transform] as const))
            // .at(-1);
            .map(fs0transform => [fs0transform, flagSymbol1.data.transforms
              .findLast(fs1transform => flagSymbol0.data.parent_type === fs1transform.child_type
                && flagSymbol1.data.parent_type === fs0transform.child_type)] as const)
            .findLast(([, fs1transform]) => fs1transform !== undefined) as
              [FlagSymbolTransform, FlagSymbolTransform] | undefined;
            // TODO test if just a find() has good enough results (and scale back to ES2022 compat)

          if (transformPair !== undefined) {
            const [transform0, transform1] = transformPair;
            doubleSymbol0 = {
              parent_type: flagSymbol0.data.parent_type,
              transform: transform0,
            };
            doubleSymbol1 = {
              parent_type: flagSymbol1.data.parent_type,
              transform: transform1,
            };
            doubleValueMax = value;
          }
        }
      }
    }

    let symbol0, symbol1;
    if (singleValueMax >= doubleValueMax) {
      [symbol0, symbol1] = [singleSymbol, noneSymbol];
    } else {
      [symbol0, symbol1] = [doubleSymbol0, doubleSymbol1];
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

  private imageLoadPromise(imageSrc: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageSrc;
      img.onerror = reject;
      img.onload = () => resolve(img);
    });
  }

  private async generateFlagCanvas() {
    const ctx = (document.getElementById("generatedFlag") as HTMLCanvasElement|null)?.getContext("2d");
    if (ctx) {
      let spriteX = 256,
          spriteY = 128,
          spriteS = 1.0;

      const colors = this.findFlagColors();
      const [symbol0, symbol1] = this.findFlagSymbol(colors.length);

      const flagShape = this.findFlagShape(colors.length);

      if (colors.length <= 0) {
        colors.push({bgColor: "#fff", fgColor: "#000"});
      }

      if (flagShape === undefined) {
        // ctx.beginPath(); // TODO check
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, 512, 256);
      } else {
        for (const path of flagShape.shapes) {
          const numPoints = path.length/2; // TODO check (with the for loop)

          ctx.beginPath();
          ctx.moveTo((path[1] as number)*512, path[2]*256); // FIXME

          if (path[1] === "circle") {
            ctx.arc(path[2]*512, path[3]*256, path[4]*256, 0, 2*Math.PI, false);
          } else if (path[1] === "circleSymbol" && symbol0.parent_type !== null) { // TODO the && should be in an inner if ?
            ctx.arc(path[2]*512, path[3]*256, path[4]*256, 0, 2*Math.PI, false);
          } else {
            for (let j=1; j < numPoints; j++) {
              ctx.lineTo((path[1+j*2] as number)*512, (path[1+j*2+1] as number)*256); // FIXME
            }
          }
          ctx.fillStyle = colors[path[0]].bgColor;
          ctx.fill();
        }

        spriteX = flagShape.symbol[0]*512;
        spriteY = flagShape.symbol[1]*256;
        spriteS = flagShape.symbol[2];
      }

      if (symbol0.parent_type !== null) {
        const tmpC = document.createElement("canvas");
        const images_sprites = await this.imageLoadPromise("/images/flag_sprites.png");
        tmpC.width = images_sprites.width;
        tmpC.height = images_sprites.height;
        const tmpCtx = tmpC.getContext("2d")!;
        tmpCtx.getImageData(0, 0, tmpC.width, tmpC.height); // TODO check if necessary, legacy put that in an unused variable

        // tmpCtx.beginPath(); // TODO check
        tmpCtx.fillStyle = colors[0].fgColor;
        tmpCtx.fillRect(0, 0, tmpC.width, tmpC.height);

        tmpCtx.globalCompositeOperation = "destination-in";
        tmpCtx.drawImage(images_sprites, 0, 0);

        ctx.save(); // TODO check (no restore until the next save)
        ctx.translate(spriteX, spriteY);
        ctx.scale(spriteS, spriteS);

        ctx.save();
        ctx.translate(symbol0.transform.parent_tx, -symbol0.transform.parent_ty);
        ctx.rotate(symbol0.transform.parent_r * Math.PI / 180);
        ctx.scale(symbol0.transform.parent_sx, symbol0.transform.parent_sy);
        ctx.drawImage(tmpC, symbol0.transform.x*128, symbol0.transform.y*128, 128, 128, -64, -64, 128, 128);
        ctx.restore();

        if (symbol1.parent_type !== null) {
          ctx.translate(symbol0.transform.child_tx, -symbol0.transform.child_ty);
          ctx.rotate(symbol0.transform.child_r * Math.PI / 180);
          ctx.scale(symbol0.transform.child_sx, symbol0.transform.child_sy);

          ctx.translate(symbol1.transform.parent_tx, -symbol1.transform.parent_ty);
          ctx.rotate(symbol1.transform.parent_r * Math.PI / 180);
          ctx.scale(symbol1.transform.parent_sx, symbol1.transform.parent_sy);

          ctx.drawImage(tmpC, symbol1.transform.x*128, symbol1.transform.y*128, 128, 128, -64, -64, 128, 128);
          ctx.restore();
        }

        ctx.restore();
      }
    }
  }

  private async generateResultsCanvas() {
    // TODO generatedResults
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
