import { CompletedAttribute } from "@domain/attribute";
import { Message } from "@domain/message";

export interface IMessagesApi {
    resolve: (attributes: CompletedAttribute[]) => Promise<Message[]>;
}
