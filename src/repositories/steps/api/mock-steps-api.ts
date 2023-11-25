import { CompletedStep, Step } from "@domain/step";
import { IStepsApi } from "../steps-api.interface";
import { fakeAsync } from "../../../utils/fake-async";

export class MockStepsApi implements IStepsApi {
    private steps: Step[] = [
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
        {
            completed: false,
            question: "К какой категории относится ваша проблема?",
            type: "select",
            response: "banks",
            options: [
                {
                    label: "Банки",
                    value: "banks",
                },
                {
                    label: "Авиакомпании",
                    value: "airfly",
                },
                {
                    label: "ВНЖ / ПМЖ",
                    value: "ressidence",
                },
            ],
        },
        {
            completed: false,
            question: "Выберите вашу проблему",
            type: "select",
            options: [
                {
                    label: "Не открывают счёт",
                    value: "dont-open-account",
                },
                {
                    label: "Не закрывают счёт",
                    value: "dont-close-accoung",
                },
                {
                    label: "Закрыли счёт в одностороннем порядке",
                    value: "unexpected-closing",
                },
                {
                    label: "Не дают снять деньги",
                    value: "no-withdraw",
                },
            ],
        },
    ];

    public resolve(steps: CompletedStep[]): Promise<Step[]> {
        return fakeAsync(
            [...steps, this.steps[steps.length]].filter((s) => Boolean(s)),
            2000
        );
    }
}
