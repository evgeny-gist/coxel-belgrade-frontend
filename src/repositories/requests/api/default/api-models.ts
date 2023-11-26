import { Request } from "@domain/request";

export type AttributeRequest = {
    attrs: { value: string; name: string }[];
    request_form: Request;
};
