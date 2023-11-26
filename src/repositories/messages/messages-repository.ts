import { IMessagesApi, ResolveResponse } from "./dependencies/messages-api.interface";
import { makeAutoObservable } from "mobx";
import { Message } from "@domain/message";
import { selectAttributes, selectCompletedAttributes } from "./helpers";
import { CompletedAttribute } from "@domain/attribute";
import { IRequestsAdapter } from "./dependencies/requests-adapter.interface";

export class MessagesRepository {
    constructor(
        private readonly api: IMessagesApi,
        private readonly requestsAdapter: IRequestsAdapter
    ) {
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
        this.updateCurrentAttribute(currentAttributeValue);
        this.makeRequest(selectCompletedAttributes(this.messages));
    }
    
    reset(): void {
        this.setMessages([]);
        this.setLoading(false);
        this.setInitialized(false);
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
            .then((res) => this.handleResolve(res))
            .finally(() => this.setLoading(false));
    }

    private handleResolve(res: ResolveResponse): void {
        this.setMessages(res.messages);
        this.requestsAdapter.toggle(res.showForm);
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
