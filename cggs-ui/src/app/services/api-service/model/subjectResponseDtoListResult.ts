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
 */
import { SubjectResponseDto } from './subjectResponseDto';

export interface SubjectResponseDtoListResult { 
    succeeded?: boolean;
    entity?: Array<SubjectResponseDto>;
    exceptionError?: string;
    message?: string;
}