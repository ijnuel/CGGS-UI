import { CountryListInterface } from "./country";
import { LocalGovernmentAreaListInterface } from "./local-government-area";

export interface StateListInterface {
    id: string;
    countryId: string;
    name?: string;
    country?: CountryListInterface;
    localGovernmentAreas?: LocalGovernmentAreaListInterface[];
}

export interface StateFormInterface {
    id?: string;
    name: string;
    description: string;
}
