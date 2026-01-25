import { StateListInterface } from "./state";

export interface CountryListInterface {
    id: string;
    name?: string;
    iso?: string;
    iso3?: string;
    dial?: string;
    currency?: string;
    currencyName?: string;
    states?: StateListInterface[];
}

export interface CountryFormInterface {
    id?: string;
    name: string;
    iso: string;
    iso3: string;
    dial: string;
    currency: string;
    currencyName: string;
}
