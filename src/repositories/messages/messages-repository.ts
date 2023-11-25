import { IMessagesApi } from "./messages-api.interface";
import { makeAutoObservable } from "mobx";
import { Message } from "@domain/message";
import { selectAttributes, selectCompletedAttributes } from "./helpers";
import { CompletedAttribute } from "@domain/attribute";

export class MessagesRepository {
    constructor(private readonly api: IMessagesApi) {
        makeAutoObservable(this);
    }

    initialized = false;
    loading = false;

    messages: Message[] = [];

    get(): Message[] {
        return [...this.messages];
    }

    init(): void {
        if (this.initialized) {
            return;
        }

        this.makeRequest([]).then(() => this.setInitialized());
    }

    advance(currentAttributeValue: string): void {
        console.debug('before', this.messages)
        this.updateCurrentAttribute(currentAttributeValue);
        console.debug('after', this.messages)
        this.makeRequest(selectCompletedAttributes(this.messages));
    }

    private updateCurrentAttribute(value: string): void {
        const attributes = selectAttributes(this.messages);

        this.setMessages([
            ...attributes.slice(0, attributes.length - 1),
            {
                ...attributes[attributes.length - 1],
                completed: true,
                response: value,
            },
        ]);
    }

    private makeRequest(attributes: CompletedAttribute[]): Promise<void> {
        this.setLoading(true);

        return this.api
            .resolve(attributes)
            .then((res) => this.setMessages(res))
            .finally(() => this.setLoading(false));
    }

    private setLoading(value = true): void {
        this.loading = value;
    }

    private setMessages(steps: Message[]): void {
        this.messages = steps;
    }

    private setInitialized(value = true): void {
        this.initialized = value;
    }
}
