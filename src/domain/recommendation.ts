import { Case } from "./case";

export type Recommendation = {
    strictMatch: boolean;
    cases: Case[];
};
