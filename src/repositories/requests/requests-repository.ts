import { makeAutoObservable } from "mobx";

export class RequestsRepositories {
    constructor() {
        makeAutoObservable(this);
    }

    private _enabled = false;

    public get enabled(): boolean {
        return this._enabled;
    }

    public toggle(value: boolean): void {
        this.setEnabled(value);
    }

    private setEnabled(value: boolean): void {
        this._enabled = value;
    }
}
