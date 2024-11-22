import { Axis, SpecialAxis } from "./commonConfiguration";

export interface AnswerValue {
    readonly axis: Axis|SpecialAxis;
    readonly value: number;
}

export interface Question {
    readonly id: string;
    readonly valuesYes: AnswerValue[];
    readonly valuesNo: AnswerValue[];
}
