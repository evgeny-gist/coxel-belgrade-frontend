import { CompletedAttribute } from "@domain/attribute";
import { mapRequest } from "./api-mappers";
import { IRequestsApi } from "@repositories/requests/dependencies/requests-api.interface";
import { Request } from "@domain/request";

export class DefaultRequestsApi implements IRequestsApi {
    private readonly URL = "http://belgrade.coxel.ru/core/question";
    private readonly ERROR_LIMIT = 3;

    private errorCounter = 0;

    public async submit(value: Request, attributes: CompletedAttribute[]): Promise<void> {
        try {
            if (this.errorCounter > this.ERROR_LIMIT) {
                throw new Error("error counter excessed");
            }

            await this.doSubmitRequest(value, attributes);
            this.errorCounter = 0;
        } catch (error: unknown) {
            this.errorCounter++;
            // TODO handle error properly
            console.error(error);
            throw error;
        }
    }

    private async doSubmitRequest(
        value: Request,
        attributes: CompletedAttribute[]
    ): Promise<void> {
        const response = await fetch(this.URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mapRequest(value, attributes)),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    }
}
