import { CompletedAttribute } from "@domain/attribute";
import { IMessagesApi, ResolveResponse } from "../../dependencies/messages-api.interface";
import { mapAttributes, mapResponse } from "./api-mappers";
import { AttributeResponse } from "./api-models";

export class DefaultMessagsApi implements IMessagesApi {
    private readonly URL = "http://belgrade.coxel.ru/core/question";
    private readonly ERROR_LIMIT = 3;

    private errorCounter = 0;

    public async resolve(attributes: CompletedAttribute[]): Promise<ResolveResponse> {
        try {
            if (this.errorCounter > this.ERROR_LIMIT) {
                console.error("error counter excessed");
                return {
                    messages: [],
                    showForm: false,
                };
            }

            const res = await this.doResolveRequest(attributes);
            const mappedRes = mapResponse(res);
            this.errorCounter = 0;

            return {
                ...mappedRes,
                messages: [...attributes, ...mappedRes.messages],
            };
        } catch (error: unknown) {
            this.errorCounter++;
            // TODO handle error properly
            console.error(error);
            throw error;
        }
    }

    private async doResolveRequest(
        attributes: CompletedAttribute[]
    ): Promise<AttributeResponse> {
        const response = await fetch(this.URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mapAttributes(attributes)),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResponse: AttributeResponse = await response.json();
        return jsonResponse;
    }
}
