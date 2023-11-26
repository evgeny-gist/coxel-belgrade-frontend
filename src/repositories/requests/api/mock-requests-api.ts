import { Request } from "@domain/request";
import { IRequestsApi } from "../dependencies/requests-api.interface";
import { fakeAsync } from "../../../utils/fake-async";

export class MockRequestsApi implements IRequestsApi {
    public async submit(value: Request): Promise<void> {
        await fakeAsync(undefined, 2000);
        console.log("submitted value:", value);
    }
}
