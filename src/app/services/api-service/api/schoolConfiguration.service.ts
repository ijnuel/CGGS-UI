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
import { Int32Result } from '../model/int32Result';
import { ProblemDetails } from '../model/problemDetails';
import { SchoolConfigurationCreateDto } from '../model/schoolConfigurationCreateDto';
import { SchoolConfigurationResponseDtoListResult } from '../model/schoolConfigurationResponseDtoListResult';
import { SchoolConfigurationResponseDtoPaginatedResultResult } from '../model/schoolConfigurationResponseDtoPaginatedResultResult';
import { SchoolConfigurationResponseDtoResult } from '../model/schoolConfigurationResponseDtoResult';
import { SchoolConfigurationUpdateDto } from '../model/schoolConfigurationUpdateDto';
import { StringResult } from '../model/stringResult';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class SchoolConfigurationService {

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
    public apiSchoolConfigurationCountGet(id?: string, observe?: 'body', reportProgress?: boolean): Observable<Int32Result>;
    public apiSchoolConfigurationCountGet(id?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Int32Result>>;
    public apiSchoolConfigurationCountGet(id?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Int32Result>>;
    public apiSchoolConfigurationCountGet(id?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<Int32Result>('get',`${this.basePath}/api/SchoolConfiguration/Count`,
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
    public apiSchoolConfigurationCreateManyPost(body?: Array<SchoolConfigurationCreateDto>, observe?: 'body', reportProgress?: boolean): Observable<Int32Result>;
    public apiSchoolConfigurationCreateManyPost(body?: Array<SchoolConfigurationCreateDto>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Int32Result>>;
    public apiSchoolConfigurationCreateManyPost(body?: Array<SchoolConfigurationCreateDto>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Int32Result>>;
    public apiSchoolConfigurationCreateManyPost(body?: Array<SchoolConfigurationCreateDto>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<Int32Result>('post',`${this.basePath}/api/SchoolConfiguration/CreateMany`,
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
    public apiSchoolConfigurationCreatePost(body?: SchoolConfigurationCreateDto, observe?: 'body', reportProgress?: boolean): Observable<StringResult>;
    public apiSchoolConfigurationCreatePost(body?: SchoolConfigurationCreateDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StringResult>>;
    public apiSchoolConfigurationCreatePost(body?: SchoolConfigurationCreateDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StringResult>>;
    public apiSchoolConfigurationCreatePost(body?: SchoolConfigurationCreateDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<StringResult>('post',`${this.basePath}/api/SchoolConfiguration/Create`,
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
    public apiSchoolConfigurationDeleteDelete(id?: string, observe?: 'body', reportProgress?: boolean): Observable<BooleanResult>;
    public apiSchoolConfigurationDeleteDelete(id?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BooleanResult>>;
    public apiSchoolConfigurationDeleteDelete(id?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BooleanResult>>;
    public apiSchoolConfigurationDeleteDelete(id?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<BooleanResult>('delete',`${this.basePath}/api/SchoolConfiguration/Delete`,
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
    public apiSchoolConfigurationDeleteManyPost(body?: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<Int32Result>;
    public apiSchoolConfigurationDeleteManyPost(body?: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Int32Result>>;
    public apiSchoolConfigurationDeleteManyPost(body?: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Int32Result>>;
    public apiSchoolConfigurationDeleteManyPost(body?: Array<string>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<Int32Result>('post',`${this.basePath}/api/SchoolConfiguration/DeleteMany`,
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
    public apiSchoolConfigurationExistsGet(id?: string, observe?: 'body', reportProgress?: boolean): Observable<BooleanResult>;
    public apiSchoolConfigurationExistsGet(id?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BooleanResult>>;
    public apiSchoolConfigurationExistsGet(id?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BooleanResult>>;
    public apiSchoolConfigurationExistsGet(id?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<BooleanResult>('get',`${this.basePath}/api/SchoolConfiguration/Exists`,
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
    public apiSchoolConfigurationGetAllGet(observe?: 'body', reportProgress?: boolean): Observable<SchoolConfigurationResponseDtoListResult>;
    public apiSchoolConfigurationGetAllGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SchoolConfigurationResponseDtoListResult>>;
    public apiSchoolConfigurationGetAllGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SchoolConfigurationResponseDtoListResult>>;
    public apiSchoolConfigurationGetAllGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<SchoolConfigurationResponseDtoListResult>('get',`${this.basePath}/api/SchoolConfiguration/GetAll`,
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
    public apiSchoolConfigurationGetAllPaginatedGet(start?: number, recordsPerPage?: number, searchText?: string, observe?: 'body', reportProgress?: boolean): Observable<SchoolConfigurationResponseDtoPaginatedResultResult>;
    public apiSchoolConfigurationGetAllPaginatedGet(start?: number, recordsPerPage?: number, searchText?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SchoolConfigurationResponseDtoPaginatedResultResult>>;
    public apiSchoolConfigurationGetAllPaginatedGet(start?: number, recordsPerPage?: number, searchText?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SchoolConfigurationResponseDtoPaginatedResultResult>>;
    public apiSchoolConfigurationGetAllPaginatedGet(start?: number, recordsPerPage?: number, searchText?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {




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

        return this.httpClient.request<SchoolConfigurationResponseDtoPaginatedResultResult>('get',`${this.basePath}/api/SchoolConfiguration/GetAllPaginated`,
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
    public apiSchoolConfigurationGetByIdGet(id?: string, observe?: 'body', reportProgress?: boolean): Observable<SchoolConfigurationResponseDtoResult>;
    public apiSchoolConfigurationGetByIdGet(id?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SchoolConfigurationResponseDtoResult>>;
    public apiSchoolConfigurationGetByIdGet(id?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SchoolConfigurationResponseDtoResult>>;
    public apiSchoolConfigurationGetByIdGet(id?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<SchoolConfigurationResponseDtoResult>('get',`${this.basePath}/api/SchoolConfiguration/GetById`,
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
    public apiSchoolConfigurationUpdateManyPut(body?: Array<SchoolConfigurationUpdateDto>, observe?: 'body', reportProgress?: boolean): Observable<Int32Result>;
    public apiSchoolConfigurationUpdateManyPut(body?: Array<SchoolConfigurationUpdateDto>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Int32Result>>;
    public apiSchoolConfigurationUpdateManyPut(body?: Array<SchoolConfigurationUpdateDto>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Int32Result>>;
    public apiSchoolConfigurationUpdateManyPut(body?: Array<SchoolConfigurationUpdateDto>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<Int32Result>('put',`${this.basePath}/api/SchoolConfiguration/UpdateMany`,
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
    public apiSchoolConfigurationUpdatePut(body?: SchoolConfigurationUpdateDto, observe?: 'body', reportProgress?: boolean): Observable<StringResult>;
    public apiSchoolConfigurationUpdatePut(body?: SchoolConfigurationUpdateDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StringResult>>;
    public apiSchoolConfigurationUpdatePut(body?: SchoolConfigurationUpdateDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StringResult>>;
    public apiSchoolConfigurationUpdatePut(body?: SchoolConfigurationUpdateDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<StringResult>('put',`${this.basePath}/api/SchoolConfiguration/Update`,
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