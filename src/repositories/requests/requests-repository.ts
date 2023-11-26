import { Request } from "@domain/request";
import { makeAutoObservable } from "mobx";

export class RequestsRepositories {
    constructor() {
        makeAutoObservable(this);
    }

    private _enabled = false;
    private _loading = false;

    public get enabled(): boolean {
        return this._enabled;
    }

    public get loading(): boolean {
        return this._loading;
    }

    public toggle(value: boolean): void {
        this.setEnabled(value);
    }

    public submit(value: Request): void {
        this.setLoading(true);
    }

    private setEnabled(value: boolean): void {
        this._enabled = value;
    }

    private setLoading(value = true): void {
        this._loading = value;
    }
}
