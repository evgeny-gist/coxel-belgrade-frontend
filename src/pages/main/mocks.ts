import { Step } from "@domain/step";

export const steps: Step[] = [
    {
        completed: true,
        question: "В какой стране вы находитесь?",
        type: "select",
        response: "serbia",
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
        completed: true,
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
