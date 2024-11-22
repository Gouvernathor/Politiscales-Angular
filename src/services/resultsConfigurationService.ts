import { Axis, SpecialAxis } from "../datamodel/commonConfiguration";
import { getLine } from "./localizationService";

export const bonusThresholds = new Map<SpecialAxis, number>([
    [SpecialAxis.Anarchism, .9],
    [SpecialAxis.Pragmatism, .5],
    [SpecialAxis.Feminism, .9],
    [SpecialAxis.Conspiracy, .9],
    [SpecialAxis.Veganism, .5],
    [SpecialAxis.Religion, .5],
    [SpecialAxis.Monarchism, .5],
]);

const charSlogan = new Map<Axis|SpecialAxis, string>([
    [Axis.Constructivism, "slogan_constructivism"],
    [Axis.Internationalism, "slogan_internationalism"],
    [Axis.Nationalism, "slogan_nationalism"],
    [Axis.Communism, "slogan_communism"],
    [Axis.Capitalism, "slogan_capitalism"],
    [Axis.LaissezFaire, "slogan_laissez_faire"],
    [Axis.Conservatism, "slogan_conservatism"],
    [Axis.JusticeSoft, "slogan_justice_soft"],
    [Axis.JusticeHard, "slogan_justice_hard"],
    [Axis.Ecology, "slogan_ecology"],
    [Axis.Revolution, "slogan_revo"],
]);
export function getSlogan(axis: Axis|SpecialAxis) {
    const id = charSlogan.get(axis);
    if (id) {
        return getLine(id);
    }
    return undefined;
}
