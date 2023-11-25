import { MockMessagesApi } from "./api/mock-messages-api";
import { MessagesRepository } from "./messages-repository";

export const messagesRepository = new MessagesRepository(new MockMessagesApi());
