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
// for (let axisname in Axis)
//   const axisvalue = Axis[axisname]

export enum SpecialAxis {
    Feminism = 10,
    Religion,
    Conspiracy,
    Pragmatism,
    Monarchism,
    Veganism,
    Anarchism,
}
// compute the max value of each axis dynamically when loading configurations

export interface AnswerValue {
    readonly axis: Axis|SpecialAxis;
    readonly value: number;
}

export interface Question {
    readonly id: string;
    readonly valuesYes: AnswerValue[];
    readonly valuesNo: AnswerValue[];
}
