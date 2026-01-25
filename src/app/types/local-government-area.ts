import { StateListInterface } from "./state";

export interface LocalGovernmentAreaListInterface {
    id: string;
    stateId: string;
    name?: string;
    state?: StateListInterface;
}

export interface LocalGovernmentAreaFormInterface {
    id?: string;
    name: string;
    description: string;
}
