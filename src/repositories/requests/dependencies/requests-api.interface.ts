import { CompletedAttribute } from "@domain/attribute";
import { Request } from "@domain/request";

export interface IRequestsApi {
    submit: (value: Request, attributes: CompletedAttribute[]) => Promise<void>;
}
