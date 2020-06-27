export * from './enquiry.service';
import { EnquiryService } from './enquiry.service';
export * from './invoice.service';
import { InvoiceService } from './invoice.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [EnquiryService, InvoiceService, UsersService];
