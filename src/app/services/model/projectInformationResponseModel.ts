/**
 * Metal Casting Project API
 * This API serves the frontend with data from databases and other external services.
 *
 * The version of the OpenAPI document: v1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ProjectTodoResponseModel } from './projectTodoResponseModel';
import { ProjectExpenditureResponseModel } from './projectExpenditureResponseModel';
import { ProjectProgressResponseModel } from './projectProgressResponseModel';


export interface ProjectInformationResponseModel { 
    id?: number;
    projectNumber?: string | null;
    projectName?: string | null;
    projectDescription?: string | null;
    invoiceReferenceNumber?: string | null;
    companyRegistrationNumber?: string | null;
    assignedEmployees?: Array<string> | null;
    projectSatisfaction?: number;
    projectExpenditure?: ProjectExpenditureResponseModel;
    projectTodo?: Array<ProjectTodoResponseModel> | null;
    projectProgress?: ProjectProgressResponseModel;
    createdOn?: string;
    projectLeaderId?: string | null;
    projectLeaderNames?: string | null;
}

