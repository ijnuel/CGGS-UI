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
import { StringResult } from '../model/stringResult';
import { StudentCreateDto } from '../model/studentCreateDto';
import { StudentResponseDtoListResult } from '../model/studentResponseDtoListResult';
import { StudentResponseDtoPaginatedResultResult } from '../model/studentResponseDtoPaginatedResultResult';
import { StudentResponseDtoResult } from '../model/studentResponseDtoResult';
import { StudentUpdateDto } from '../model/studentUpdateDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class StudentService {

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
    public apiStudentCountGet(id?: string, observe?: 'body', reportProgress?: boolean): Observable<Int32Result>;
    public apiStudentCountGet(id?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Int32Result>>;
    public apiStudentCountGet(id?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Int32Result>>;
    public apiStudentCountGet(id?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<Int32Result>('get',`${this.basePath}/api/Student/Count`,
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
    public apiStudentCreateManyPost(body?: Array<StudentCreateDto>, observe?: 'body', reportProgress?: boolean): Observable<Int32Result>;
    public apiStudentCreateManyPost(body?: Array<StudentCreateDto>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Int32Result>>;
    public apiStudentCreateManyPost(body?: Array<StudentCreateDto>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Int32Result>>;
    public apiStudentCreateManyPost(body?: Array<StudentCreateDto>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<Int32Result>('post',`${this.basePath}/api/Student/CreateMany`,
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
    public apiStudentCreatePost(body?: StudentCreateDto, observe?: 'body', reportProgress?: boolean): Observable<StringResult>;
    public apiStudentCreatePost(body?: StudentCreateDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StringResult>>;
    public apiStudentCreatePost(body?: StudentCreateDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StringResult>>;
    public apiStudentCreatePost(body?: StudentCreateDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<StringResult>('post',`${this.basePath}/api/Student/Create`,
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
    public apiStudentDeleteDelete(id?: string, observe?: 'body', reportProgress?: boolean): Observable<BooleanResult>;
    public apiStudentDeleteDelete(id?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BooleanResult>>;
    public apiStudentDeleteDelete(id?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BooleanResult>>;
    public apiStudentDeleteDelete(id?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<BooleanResult>('delete',`${this.basePath}/api/Student/Delete`,
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
    public apiStudentDeleteManyPost(body?: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<Int32Result>;
    public apiStudentDeleteManyPost(body?: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Int32Result>>;
    public apiStudentDeleteManyPost(body?: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Int32Result>>;
    public apiStudentDeleteManyPost(body?: Array<string>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<Int32Result>('post',`${this.basePath}/api/Student/DeleteMany`,
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
    public apiStudentExistsGet(id?: string, observe?: 'body', reportProgress?: boolean): Observable<BooleanResult>;
    public apiStudentExistsGet(id?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BooleanResult>>;
    public apiStudentExistsGet(id?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BooleanResult>>;
    public apiStudentExistsGet(id?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<BooleanResult>('get',`${this.basePath}/api/Student/Exists`,
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
    public apiStudentGetAllGet(observe?: 'body', reportProgress?: boolean): Observable<StudentResponseDtoListResult>;
    public apiStudentGetAllGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StudentResponseDtoListResult>>;
    public apiStudentGetAllGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StudentResponseDtoListResult>>;
    public apiStudentGetAllGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<StudentResponseDtoListResult>('get',`${this.basePath}/api/Student/GetAll`,
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
    public apiStudentGetAllPaginatedGet(start?: number, recordsPerPage?: number, searchText?: string, observe?: 'body', reportProgress?: boolean): Observable<StudentResponseDtoPaginatedResultResult>;
    public apiStudentGetAllPaginatedGet(start?: number, recordsPerPage?: number, searchText?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StudentResponseDtoPaginatedResultResult>>;
    public apiStudentGetAllPaginatedGet(start?: number, recordsPerPage?: number, searchText?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StudentResponseDtoPaginatedResultResult>>;
    public apiStudentGetAllPaginatedGet(start?: number, recordsPerPage?: number, searchText?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {




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

        return this.httpClient.request<StudentResponseDtoPaginatedResultResult>('get',`${this.basePath}/api/Student/GetAllPaginated`,
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
    public apiStudentGetByIdGet(id?: string, observe?: 'body', reportProgress?: boolean): Observable<StudentResponseDtoResult>;
    public apiStudentGetByIdGet(id?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StudentResponseDtoResult>>;
    public apiStudentGetByIdGet(id?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StudentResponseDtoResult>>;
    public apiStudentGetByIdGet(id?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<StudentResponseDtoResult>('get',`${this.basePath}/api/Student/GetById`,
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
    public apiStudentUpdateManyPut(body?: Array<StudentUpdateDto>, observe?: 'body', reportProgress?: boolean): Observable<Int32Result>;
    public apiStudentUpdateManyPut(body?: Array<StudentUpdateDto>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Int32Result>>;
    public apiStudentUpdateManyPut(body?: Array<StudentUpdateDto>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Int32Result>>;
    public apiStudentUpdateManyPut(body?: Array<StudentUpdateDto>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<Int32Result>('put',`${this.basePath}/api/Student/UpdateMany`,
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
    public apiStudentUpdatePut(body?: StudentUpdateDto, observe?: 'body', reportProgress?: boolean): Observable<StringResult>;
    public apiStudentUpdatePut(body?: StudentUpdateDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StringResult>>;
    public apiStudentUpdatePut(body?: StudentUpdateDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StringResult>>;
    public apiStudentUpdatePut(body?: StudentUpdateDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<StringResult>('put',`${this.basePath}/api/Student/Update`,
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
