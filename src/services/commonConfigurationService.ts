import { getAllEnumValues } from "enum-for";
import { AnyAxis, Axis, BaseAxis, SpecialAxis } from "../datamodel/commonConfiguration";

const axisById = new Map<string, Axis>(getAllEnumValues(Axis).map(axis =>
    [BaseAxis[Math.abs(axis) as BaseAxis] + (axis > 0 ? "0" : "1"), axis]));
const specialAxisById = new Map<string, SpecialAxis>([
    ["femi", SpecialAxis.Feminism],
    ["anar", SpecialAxis.Anarchism],
    ["comp", SpecialAxis.Conspiracy],
    ["mona", SpecialAxis.Monarchism],
    ["prag", SpecialAxis.Pragmatism],
    ["reli", SpecialAxis.Religion],
    ["vega", SpecialAxis.Veganism],
]);
const anyAxisIdByAnyAxis = new Map<AnyAxis, string>(
    [...axisById.entries(), ...specialAxisById.entries()]
        .map(([id, axis]) => [axis, id])
);
export function getAnyAxisId(axis: AnyAxis): string|null {
    return anyAxisIdByAnyAxis.get(axis) || null;
}
export function getAnyAxisFromId(id: string): AnyAxis|null {
    return axisById.get(id) || specialAxisById.get(id) || null;
}
export function* getIdsAndAnyAxes(): Iterable<[string, AnyAxis]> {
    yield* axisById.entries();
    yield* specialAxisById.entries();
}
