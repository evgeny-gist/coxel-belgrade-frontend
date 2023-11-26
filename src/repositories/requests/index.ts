import { MockRequestsApi } from "./api/mock-requests-api";
import { RequestsRepositories } from "./requests-repository";

export const requestsRepository = new RequestsRepositories(new MockRequestsApi());
