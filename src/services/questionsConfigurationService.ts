import { Axis, SpecialAxis, AnswerValue, Question } from "../datamodel/questionsConfiguration";

type RawAnswerValue = {
    axis: string,
    value: number,
}
type RawQuestion = Omit<Question, "valuesYes"|"valuesNo"> & {
    valuesYes: RawAnswerValue[],
    valuesNo: RawAnswerValue[],
};

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

function valueMapper(value: RawAnswerValue): AnswerValue {
    return {
        axis: axesIds.get(value.axis)!,
        value: value.value,
    };
}

export function getQuestions(rawData: RawQuestion[]): Question[] {
    return rawData.map((question: RawQuestion) => ({
        ...question,
        valuesYes: question.valuesYes.map(valueMapper),
        valuesNo: question.valuesNo.map(valueMapper),
    }));
}
