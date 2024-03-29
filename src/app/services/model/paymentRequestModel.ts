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


export interface PaymentRequestModel { 
    paymentId?: number;
    invoiceReference?: string | null;
    dateOfPayment?: string;
    proofOfPaymentURL?: string | null;
    paymentType?: string | null;
    companyRegistration?: string | null;
    amount?: number;
    status?: string | null;
    approvedBy?: string | null;
}

