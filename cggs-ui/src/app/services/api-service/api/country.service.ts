/**
 * API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { BooleanResult } from '../model/booleanResult';
import { CountryCreateDto } from '../model/countryCreateDto';
import { CountryResponseDtoListResult } from '../model/countryResponseDtoListResult';
import { CountryResponseDtoPaginatedResultResult } from '../model/countryResponseDtoPaginatedResultResult';
import { CountryResponseDtoResult } from '../model/countryResponseDtoResult';
import { CountryUpdateDto } from '../model/countryUpdateDto';
import { Int32Result } from '../model/int32Result';
import { ProblemDetails } from '../model/problemDetails';
import { StringResult } from '../model/stringResult';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CountryService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCountryCountGet(id?: string, observe?: 'body', reportProgress?: boolean): Observable<Int32Result>;
    public apiCountryCountGet(id?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Int32Result>>;
    public apiCountryCountGet(id?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Int32Result>>;
    public apiCountryCountGet(id?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Int32Result>('get',`${this.basePath}/api/Country/Count`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCountryCreateManyPost(body?: Array<CountryCreateDto>, observe?: 'body', reportProgress?: boolean): Observable<Int32Result>;
    public apiCountryCreateManyPost(body?: Array<CountryCreateDto>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Int32Result>>;
    public apiCountryCreateManyPost(body?: Array<CountryCreateDto>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Int32Result>>;
    public apiCountryCreateManyPost(body?: Array<CountryCreateDto>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<Int32Result>('post',`${this.basePath}/api/Country/CreateMany`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCountryCreatePost(body?: CountryCreateDto, observe?: 'body', reportProgress?: boolean): Observable<StringResult>;
    public apiCountryCreatePost(body?: CountryCreateDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StringResult>>;
    public apiCountryCreatePost(body?: CountryCreateDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StringResult>>;
    public apiCountryCreatePost(body?: CountryCreateDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<StringResult>('post',`${this.basePath}/api/Country/Create`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCountryDeleteDelete(id?: string, observe?: 'body', reportProgress?: boolean): Observable<BooleanResult>;
    public apiCountryDeleteDelete(id?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BooleanResult>>;
    public apiCountryDeleteDelete(id?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BooleanResult>>;
    public apiCountryDeleteDelete(id?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<BooleanResult>('delete',`${this.basePath}/api/Country/Delete`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCountryDeleteManyPost(body?: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<Int32Result>;
    public apiCountryDeleteManyPost(body?: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Int32Result>>;
    public apiCountryDeleteManyPost(body?: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Int32Result>>;
    public apiCountryDeleteManyPost(body?: Array<string>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<Int32Result>('post',`${this.basePath}/api/Country/DeleteMany`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCountryExistsGet(id?: string, observe?: 'body', reportProgress?: boolean): Observable<BooleanResult>;
    public apiCountryExistsGet(id?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BooleanResult>>;
    public apiCountryExistsGet(id?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BooleanResult>>;
    public apiCountryExistsGet(id?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<BooleanResult>('get',`${this.basePath}/api/Country/Exists`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCountryGetAllGet(observe?: 'body', reportProgress?: boolean): Observable<CountryResponseDtoListResult>;
    public apiCountryGetAllGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CountryResponseDtoListResult>>;
    public apiCountryGetAllGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CountryResponseDtoListResult>>;
    public apiCountryGetAllGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<CountryResponseDtoListResult>('get',`${this.basePath}/api/Country/GetAll`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param start 
     * @param recordsPerPage 
     * @param searchText 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCountryGetAllPaginatedGet(start?: number, recordsPerPage?: number, searchText?: string, observe?: 'body', reportProgress?: boolean): Observable<CountryResponseDtoPaginatedResultResult>;
    public apiCountryGetAllPaginatedGet(start?: number, recordsPerPage?: number, searchText?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CountryResponseDtoPaginatedResultResult>>;
    public apiCountryGetAllPaginatedGet(start?: number, recordsPerPage?: number, searchText?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CountryResponseDtoPaginatedResultResult>>;
    public apiCountryGetAllPaginatedGet(start?: number, recordsPerPage?: number, searchText?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {




        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (start !== undefined && start !== null) {
            queryParameters = queryParameters.set('start', <any>start);
        }
        if (recordsPerPage !== undefined && recordsPerPage !== null) {
            queryParameters = queryParameters.set('recordsPerPage', <any>recordsPerPage);
        }
        if (searchText !== undefined && searchText !== null) {
            queryParameters = queryParameters.set('searchText', <any>searchText);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<CountryResponseDtoPaginatedResultResult>('get',`${this.basePath}/api/Country/GetAllPaginated`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCountryGetByIdGet(id?: string, observe?: 'body', reportProgress?: boolean): Observable<CountryResponseDtoResult>;
    public apiCountryGetByIdGet(id?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CountryResponseDtoResult>>;
    public apiCountryGetByIdGet(id?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CountryResponseDtoResult>>;
    public apiCountryGetByIdGet(id?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<CountryResponseDtoResult>('get',`${this.basePath}/api/Country/GetById`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCountryUpdateManyPut(body?: Array<CountryUpdateDto>, observe?: 'body', reportProgress?: boolean): Observable<Int32Result>;
    public apiCountryUpdateManyPut(body?: Array<CountryUpdateDto>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Int32Result>>;
    public apiCountryUpdateManyPut(body?: Array<CountryUpdateDto>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Int32Result>>;
    public apiCountryUpdateManyPut(body?: Array<CountryUpdateDto>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<Int32Result>('put',`${this.basePath}/api/Country/UpdateMany`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCountryUpdatePut(body?: CountryUpdateDto, observe?: 'body', reportProgress?: boolean): Observable<StringResult>;
    public apiCountryUpdatePut(body?: CountryUpdateDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StringResult>>;
    public apiCountryUpdatePut(body?: CountryUpdateDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StringResult>>;
    public apiCountryUpdatePut(body?: CountryUpdateDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<StringResult>('put',`${this.basePath}/api/Country/Update`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
