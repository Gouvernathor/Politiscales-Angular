import { SpecialAxis } from "../datamodel/commonConfiguration";

export const bonusThresholds = new Map<SpecialAxis, number>([
    [SpecialAxis.Anarchism, .9],
    [SpecialAxis.Pragmatism, .5],
    [SpecialAxis.Feminism, .9],
    [SpecialAxis.Conspiracy, .9],
    [SpecialAxis.Veganism, .5],
    [SpecialAxis.Religion, .5],
    [SpecialAxis.Monarchism, .5],
]);
