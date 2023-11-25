import { MockStepsApi } from "./api/mock-steps-api";
import { StepsRepository } from "./steps-repository";

export const stepsRepository = new StepsRepository(new MockStepsApi());
