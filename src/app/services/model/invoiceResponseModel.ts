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


export interface InvoiceResponseModel { 
    id?: number;
    reference?: string | null;
    invoice_date?: string;
    date_due?: string;
    items?: Array<QuotationItemEntity> | null;
    vat_percentage?: number;
    bill_address?: string | null;
    vat?: number;
    subtotal?: number;
    grand_totoal?: number;
    company_registration?: string | null;
    generatedBy?: string | null;
    approvedBy?: string | null;
    amount_due?: number;
    amount_payed?: number;
}

