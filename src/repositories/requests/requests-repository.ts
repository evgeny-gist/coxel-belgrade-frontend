import { Request } from "@domain/request";
import { makeAutoObservable } from "mobx";
import { IRequestsApi } from "./dependencies/requests-api.interface";

export class RequestsRepositories {
    constructor(private readonly api: IRequestsApi) {
        makeAutoObservable(this);
    }

    private _enabled = false;
    private _loading = false;
    private _submitted = false;

    public get enabled(): boolean {
        return this._enabled;
    }

    public get loading(): boolean {
        return this._loading;
    }

    public get submitted(): boolean {
        return this._submitted;
    }

    public toggle(value: boolean): void {
        this.setEnabled(value);
    }

    public submit(value: Request): void {
        this.setLoading(true);

        this.api
            .submit(value)
            .then(() => this.setSubmitted())
            .finally(() => this.setLoading(false));
    }

    public reset(): void {
        this.setEnabled(false);
        this.setLoading(false);
        this.setSubmitted(false);
    }

    private setEnabled(value: boolean): void {
        this._enabled = value;
    }

    private setLoading(value = true): void {
        this._loading = value;
    }

    private setSubmitted(value = true): void {
        this._submitted = value;
    }
}
