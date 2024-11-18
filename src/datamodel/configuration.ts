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
