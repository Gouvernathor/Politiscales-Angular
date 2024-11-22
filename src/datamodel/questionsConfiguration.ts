import { AnyAxis } from "./commonConfiguration";

export interface AnswerValue {
    readonly axis: AnyAxis;
    readonly value: number;
}

export interface Question {
    readonly id: string;
    readonly valuesYes: AnswerValue[];
    readonly valuesNo: AnswerValue[];
}
