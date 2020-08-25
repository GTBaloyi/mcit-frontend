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
import { QuotationItemEntity } from './quotationItemEntity';


export interface QuotationModel { 
    quote_id?: number;
    quote_reference?: string | null;
    date_generated?: string;
    quote_expiryDate?: string;
    email?: string | null;
    company_name?: string | null;
    company_Registration?: string | null;
    bill_address?: string | null;
    phone_number?: string | null;
    description?: string | null;
    items?: Array<QuotationItemEntity> | null;
    subTotal?: number;
    globalDiscount?: number;
    globalTax?: number;
    grand_total?: number;
    status?: string | null;
    reason?: string | null;
    generatedBy?: string | null;
    approvedBy?: string | null;
}

