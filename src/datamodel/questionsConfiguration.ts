export enum Axis {
    Constructivism = 1,
    JusticeSoft,
    Progressivism,
    Internationalism,
    Communism,
    Regulationnism,
    Ecology,
    Revolution,
    Essentialism = -Constructivism,
    JusticeHard = -JusticeSoft,
    Conservatism = -Progressivism,
    Nationalism = -Internationalism,
    Capitalism = -Communism,
    LaissezFaire = -Regulationnism,
    Productivism = -Ecology,
    Reformism = -Revolution,
}

export enum SpecialAxis {
    Feminism = 10,
    Religion,
    Conspiracy,
    Pragmatism,
    Monarchism,
    Veganism,
    Anarchism,
}

export interface AnswerValue {
    readonly axis: Axis|SpecialAxis;
    readonly value: number;
}

export interface Question {
    readonly id: string;
    readonly valuesYes: AnswerValue[];
    readonly valuesNo: AnswerValue[];
}

const axisById = new Map<string, Axis|SpecialAxis>([
    ["c0", Axis.Constructivism],
    ["c1", Axis.Essentialism],
    ["b0", Axis.Internationalism],
    ["b1", Axis.Nationalism],
    ["p0", Axis.Communism],
    ["p1", Axis.Capitalism],
    ["m0", Axis.Regulationnism],
    ["m1", Axis.LaissezFaire],
    ["s0", Axis.Progressivism],
    ["s1", Axis.Conservatism],
    ["j0", Axis.JusticeSoft],
    ["j1", Axis.JusticeHard],
    ["e0", Axis.Ecology],
    ["e1", Axis.Productivism],
    ["t0", Axis.Revolution],
    ["t1", Axis.Reformism],

    ["femi", SpecialAxis.Feminism],
    ["anar", SpecialAxis.Anarchism],
    ["comp", SpecialAxis.Conspiracy],
    ["mona", SpecialAxis.Monarchism],
    ["prag", SpecialAxis.Pragmatism],
    ["reli", SpecialAxis.Religion],
    ["vega", SpecialAxis.Veganism],
]);
export function getAxisId(axis: Axis|SpecialAxis): string|null {
    for (const [id, value] of axisById.entries()) {
        if (value === axis) {
            return id;
        }
    }
    return null;
}
export function getAxisFromId(id: string): Axis|SpecialAxis|null {
    return axisById.get(id) || null;
}
export function* getIdsAndAxes(): Iterable<[string, Axis|SpecialAxis]> {
    yield* axisById.entries();
}
