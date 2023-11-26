import { CompletedAttribute } from "@domain/attribute";
import { AttributeRequest } from "./api-models";
import { Request } from "@domain/request";

export const mapRequest = (
    request: Request,
    attributes: CompletedAttribute[]
): AttributeRequest => ({
    attrs: attributes.map((a) => ({
        name: a.name,
        value: a.response,
    })),
    request_form: request,
});
