import { Attribute, isAttributeCompleted } from "@domain/attribute";
import { IMessagesApi } from "./messages-api.interface";
import { makeAutoObservable } from "mobx";
import { Message } from "@domain/message";

export class MessagesRepository {
    constructor(private readonly api: IMessagesApi) {
        makeAutoObservable(this);
    }

    loading = false;

    messages: Message[] = [
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

    get(): Message[] {
        return [...this.messages];
    }

    advance(currentAttributeValue: string): void {
        this.updateCurrentAttribute(currentAttributeValue);

        this.setLoading(true);

        this.api
            .resolve(this.messages.filter(isAttributeCompleted))
            .then((res) => this.setMessages(res))
            .finally(() => this.setLoading(false));
    }

    private updateCurrentAttribute(value: string): void {
        this.setMessages([
            ...this.messages.slice(0, this.messages.length - 1),
            {
                ...this.messages[this.messages.length - 1],
                completed: true,
                response: value,
            },
        ]);
    }

    private setLoading(value = true): void {
        this.loading = value;
    }

    private setMessages(steps: Attribute[]): void {
        this.messages = steps;
    }
}
