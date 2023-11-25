import { CompletedStep, Step } from "@domain/step";

export interface IStepsApi {
    resolve: (steps: CompletedStep[]) => Promise<Step[]>;
}
