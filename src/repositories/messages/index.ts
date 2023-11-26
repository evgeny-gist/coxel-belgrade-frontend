import { requestsRepository } from "@repositories/requests";
// import { MockMessagesApi } from "./api/mock-messages-api";
import { MessagesRepository } from "./messages-repository";
import { DefaultMessagsApi } from "./api/default/default-messages-api";

export const messagesRepository = new MessagesRepository(
    new DefaultMessagsApi(),
    requestsRepository,
);
