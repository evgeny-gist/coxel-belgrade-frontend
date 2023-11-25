import { CompletedAttribute, Attribute } from "@domain/attribute";

export interface IMessagesApi {
    resolve: (messages: CompletedAttribute[]) => Promise<Attribute[]>;
}
