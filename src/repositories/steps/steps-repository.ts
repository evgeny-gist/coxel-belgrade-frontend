import { CompletedStep, Step } from "@domain/step";
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

    advance(steps: CompletedStep[]): void {
        this.loading = true;

        this.api
            .resolve(steps)
            .then((res) => (this.steps = res))
            .finally(() => (this.loading = false));
    }
}
