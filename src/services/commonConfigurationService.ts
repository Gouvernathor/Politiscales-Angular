import { getAllEnumEntries, getAllEnumValues } from "enum-for";
import { AnyAxis, Axis, BaseAxis, SpecialAxis } from "../datamodel/commonConfiguration";

// Primary cache maps
const baseAxisById = new Map<string, BaseAxis>(getAllEnumEntries(BaseAxis));
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
// Merges and reverse maps
const anyAxisById = new Map<string, AnyAxis>(
    [...axisById.entries(), ...specialAxisById.entries()]);
const idByBaseAxis = new Map<BaseAxis, string>(
    [...baseAxisById.entries()]
        .map(([id, axis]) => [axis, id]));
const idByAxis = new Map<Axis, string>(
    [...axisById.entries()]
        .map(([id, axis]) => [axis, id]));
const idBySpecialAxis = new Map<SpecialAxis, string>(
    [...specialAxisById.entries()]
        .map(([id, axis]) => [axis, id]));
const idByAnyAxis = new Map<AnyAxis, string>(
    [...idByAxis.entries(), ...idBySpecialAxis.entries()]);

// Access functions
function getBaseAxisId(axis: BaseAxis) {
    return idByBaseAxis.get(axis)!;
}
function getAxisId(axis: Axis) {
    return idByAxis.get(axis)!;
}
function getSpecialAxisId(axis: SpecialAxis) {
    return idBySpecialAxis.get(axis)!;
}
export function getAnyAxisId(axis: AnyAxis) {
    return idByAnyAxis.get(axis)!;
}
export function getBaseAxisFromId(id: string) {
    return baseAxisById.get(id);
}
function getAxisFromId(id: string) {
    return axisById.get(id);
}
function getSpecialAxisFromId(id: string) {
    return specialAxisById.get(id);
}
export function getAnyAxisFromId(id: string) {
    return anyAxisById.get(id);
}
function* getIdsAndBaseAxes() {
    // yield* baseAxisById.entries();
    yield* getAllEnumEntries(BaseAxis); // presumably faster
}
function* getIdsAndAxes() {
    yield* axisById.entries();
}
function* getIdsAndSpecialAxes() {
    yield* specialAxisById.entries();
}
export function* getIdsAndAnyAxes() {
    yield* axisById.entries();
    yield* specialAxisById.entries();
}
