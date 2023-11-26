import { Request } from "@domain/request";

export interface IRequestsApi {
    submit: (value: Request) => Promise<void>;
}
