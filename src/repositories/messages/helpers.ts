import { Attribute, CompletedAttribute, isAttribute, isAttributeCompleted } from "@domain/attribute";
import { Message } from "@domain/message";

export const selectAttributes = (messages: Message[]): Attribute[] =>
    messages.reduce<Attribute[]>((acc, msg) => {
        if (isAttribute(msg)) {
            return [...acc, msg];
        }

        return acc;
    }, []);

export const selectCompletedAttributes = (messages: Message[]): CompletedAttribute[] =>
    messages.reduce<CompletedAttribute[]>((acc, msg) => {
        if (isAttribute(msg) && isAttributeCompleted(msg)) {
            return [...acc, msg];
        }

        return acc;
    }, []);
