import { Case } from "./case";

export type Recommendation = {
    strictMatch: boolean;
    cases: Case[];
};

export function isOptimalRecommendation(r: Recommendation): boolean {
    return Boolean(r.cases.length) && r.strictMatch;
}

export function isPartialRecommendation(r: Recommendation): boolean {
    return Boolean(r.cases.length) && !r.strictMatch;
}

export function isUniqueRecommendation(r: Recommendation): boolean {
    return !r.cases.length;
}
