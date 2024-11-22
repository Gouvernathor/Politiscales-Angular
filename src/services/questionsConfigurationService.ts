import rawQuestions from '../assets/questions.json';
import { AnswerValue, Question } from "../datamodel/questionsConfiguration";
import { getAxisFromId } from "./commonConfigurationService";

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

export function getQuestions(rawData: RawQuestion[] = rawQuestions): Question[] {
    return rawData.map((question: RawQuestion) => ({
        ...question,
        valuesYes: question.valuesYes.map(valueMapper),
        valuesNo: question.valuesNo.map(valueMapper),
    }));
}
