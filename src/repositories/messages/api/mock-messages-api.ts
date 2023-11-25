import { CompletedAttribute, Attribute } from "@domain/attribute";
import { IMessagesApi } from "../messages-api.interface";
import { fakeAsync } from "../../../utils/fake-async";
import { Message } from "@domain/message";
import { Recommendation } from "@domain/recommendation";

const RECOMMENDATION = `
Мы уже взаимодейтсвовали с этим банком. Мы обратились в Центробанк и получили от него ответ:

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nibh elit, aliquam et ultricies condimentum, tincidunt nec mauris. Proin arcu turpis, pulvinar a tincidunt non, ultricies at diam. Pellentesque cursus vitae erat vel tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla suscipit facilisis mauris vitae efficitur. Suspendisse tincidunt rutrum justo, id aliquet arcu tempus eget. Suspendisse ut elit sollicitudin, sodales nulla vel, sollicitudin eros. Nunc facilisis libero est. Morbi lorem nulla, accumsan vitae dictum a, efficitur sed nibh. Nulla scelerisque augue elementum viverra pulvinar.

Предлагаем обратиться в банк повторно, сославшись на этот текст.
`;

export class MockMessagesApi implements IMessagesApi {
    private counter = 0;

    private attributes: Attribute[] = [
        {
            name: "country",
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
            name: "category",
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
            name: "problem",
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

    public resolve(steps: CompletedAttribute[]): Promise<Message[]> {
        return fakeAsync<Message[]>(
            [...steps, this.attributes[steps.length], this.getRecommendation()!].filter((s) =>
                Boolean(s)
            ),
            2000
        );
    }

    private getRecommendation(): Recommendation | undefined {
        if (this.counter === 0) {
            this.counter++;
            return;
        }

        if (this.counter === 1) {
            this.counter++;
            return {
                cases: [
                    {
                        date: "11 ноября 2023",
                        name: "Разбирательство с этим банком",
                        text: RECOMMENDATION,
                    },
                ],
                strictMatch: true,
            };
        }

        if (this.counter === 2) {
            this.counter++;
            return {
                cases: [
                    {
                        date: "4 января 2023",
                        name: "Разбирательство с банком A",
                        text: RECOMMENDATION,
                    },
                    {
                        date: "9 августа 2023",
                        name: "Разбирательство с банком B",
                        text: RECOMMENDATION,
                    },
                    {
                        date: "15 апреля 2023",
                        name: "Разбирательство с банком C",
                        text: RECOMMENDATION,
                    },
                ],
                strictMatch: false,
            };
        }

        return {
            cases: [],
            strictMatch: false,
        };
    }
}
