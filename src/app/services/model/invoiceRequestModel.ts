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


export interface InvoiceRequestModel { 
    id?: number;
    reference?: string | null;
    invoice_date?: string;
    date_due?: string;
    daysBeforeExpiry?: number;
    quotation_Reference?: string | null;
    vat_percentage?: number;
    bill_address?: string | null;
    vat?: number;
    discount?: number;
    subtotal?: number;
    quantity?: number;
    grand_total?: number;
    company_registration?: string | null;
    generatedBy?: string | null;
    approvedBy?: string | null;
    amountDue?: number;
    amountPayed?: number;
}

