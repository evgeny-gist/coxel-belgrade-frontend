import { Step, isStepCompleted } from "@domain/step";
import { IStepsApi } from "./steps-api.interface";
import { makeAutoObservable } from "mobx";

export class StepsRepository {
    constructor(private readonly api: IStepsApi) {
        makeAutoObservable(this);
    }

    loading = false;

    steps: Step[] = [
        {
            completed: false,
            question: "В какой стране вы находитесь?",
            type: "select",
            options: [
                {
                    label: "Италия",
                    value: "italy",
                },
                {
                    label: "Сербия",
                    value: "serbia",
                },
                {
                    label: "Босния и Герцеговина",
                    value: "bosnia",
                },
            ],
        },
    ];

    get(): Step[] {
        return [...this.steps];
    }

    advance(currentStepValue: string): void {
        this.updateCurrentStep(currentStepValue);

        this.setLoading(true);

        this.api
            .resolve(this.steps.filter(isStepCompleted))
            .then((res) => this.setSteps(res))
            .finally(() => this.setLoading(false));
    }

    private updateCurrentStep(value: string): void {
        this.setSteps([
            ...this.steps.slice(0, this.steps.length - 1),
            {
                ...this.steps[this.steps.length - 1],
                completed: true,
                response: value,
            },
        ]);
    }

    private setLoading(value = true): void {
        this.loading = value;
    }

    private setSteps(steps: Step[]): void {
        this.steps = steps;
    }
}
