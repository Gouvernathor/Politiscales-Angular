// The types defined in this file are meant to be instantiated and filled by reading JSON.

enum Axis {
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
// for (let axisname in Axis)
//   const axisvalue = Axis[axisname]

enum SpecialAxis {
    Feminism = 10,
    Religion,
    Conspiracy,
    Pragmatism,
    Monarchism,
    Veganism,
    Anarchism,
}
// compute the max value of each axis dynamically when loading configurations

interface AnswerValue {
    readonly axis: Axis|SpecialAxis;
    readonly value: bigint;
}

interface Question {
    readonly id: string;
    readonly valuesYes: AnswerValue[];
    readonly valuesNo: AnswerValue[];
}

const axesIds = new Map<string, Axis|SpecialAxis>([
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
