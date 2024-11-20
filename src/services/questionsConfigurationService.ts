import { AnswerValue, Question, getAxisFromId } from "../datamodel/questionsConfiguration";

type RawAnswerValue = {
    axis: string,
    value: number,
}
type RawQuestion = Omit<Question, "valuesYes"|"valuesNo"> & {
    valuesYes: RawAnswerValue[],
    valuesNo: RawAnswerValue[],
};

function valueMapper(value: RawAnswerValue): AnswerValue {
    return {
        axis: getAxisFromId(value.axis)!,
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
