import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {
    ClientRegistrationRequestModel,
    InvoiceRequestModel,
    InvoiceService,
    ProductsService,
    QuotationService
} from "../../services";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import moment = require('moment');
import {QuotationResponseModel} from "../../services/model/models";

@Component({
  selector: 'app-view-quotation',
  templateUrl: './view-quotation.component.html',
  styleUrls: ['./view-quotation.component.scss']
})
export class ViewQuotationComponent implements OnInit {
    heading = 'Quotation';
    subheading = 'View all quotations';
    icon = 'pe-7s-calculator icon-gradient bg-tempting-azure';

    isLoading = true;
    invoice : InvoiceRequestModel = {};
    userInformation : ClientRegistrationRequestModel =  <ClientRegistrationRequestModel>'' ;
    quotationsArray: Array<QuotationResponseModel> = [];
    username : any;
    filter : string;
    config: any;
    showModal: boolean;


    constructor(public quotationService: QuotationService,
                public productsService: ProductsService,
                public router: Router,
                public toastr: ToastrService,
                public invoiceService: InvoiceService) {
    }

    ngOnInit() {
        this.username  = JSON.parse(sessionStorage.getItem("username"));
        this.getQuotation();

        this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.quotationsArray.length
        };
    }

    getQuotation(){
        this.isLoading = true;

      this.quotationService.apiQuotationQuotesEmailGet(this.username).subscribe (
          (data: any) => {
              this.quotationsArray = data;
          },
          error => {
              console.log(error);
              this.showError();
          },
          () => {
              this.sortData;
              this.showSuccess();
          }
      );
    }


    get sortData(): Array<QuotationResponseModel> {
        return this.quotationsArray.sort((quotationUnsorted, quotationSorted) => {
            return <any>new Date(quotationSorted.date_generated) - <any>new Date(quotationUnsorted.date_generated);
        });
    }

    /*filterData(searchTerm){
        this.quotationsArray = this.quotationsArray.filter(quotations => matches(quotations, searchTerm, this.pipe));
        const total = this.quotationsArray.length;
    }*/

    show() {
        this.showModal = true;
    }

    hide() {
        this.showModal = false;
    }


    acceptQuotation(quotation : QuotationResponseModel){
        quotation.status = "Accepted";

        this.isLoading = true;
        this.quotationService.apiQuotationUpdateQuotePut(quotation).subscribe (
            () => {
            },
            error => {
                console.log(error);
                this.showError();
            },
            () => {
                this.generateInvoice(quotation);
                this.getQuotation();
                this.showSuccess();
            }
        );
    }

    rejectQuotation(quotation : QuotationResponseModel){
        quotation.status = "Rejected";

        this.isLoading = true;
        this.quotationService.apiQuotationUpdateQuotePut(quotation).subscribe (
            () => {
            },
            error => {
                console.log(error);
                this.showError();
            },
            () => {
                this.hide();
                this.getQuotation();
                this.showSuccess();
            }
        );
    }

    generateInvoice(quotation : QuotationResponseModel){
        console.log('I came in here');

        let date = moment().format("yyyy-MM-DD");
        this.userInformation  = JSON.parse(sessionStorage.getItem("userInformation"));

        this.invoice.id = 0;
        this.invoice.reference = '';
        this.invoice.invoice_date = date;
        this.invoice.date_due = date;
        this.invoice.daysBeforeExpiry = 30;
        this.invoice.quotation_Reference = quotation.quote_reference;
        this.invoice.vat_percentage = quotation.vat;
        this.invoice.bill_address = quotation.bill_address;
        this.invoice.vat = quotation.vat_Amount;
        this.invoice.discount = quotation.discount;
        this.invoice.subtotal = quotation.sub_Total;
        this.invoice.grand_total = quotation.grand_total;
        this.invoice.company_registration = this.userInformation.companyRegistrationNumber;
        this.invoice.generatedBy = '';
        this.invoice.approvedBy = '';

        this.isLoading = true;
        this.invoiceService.apiInvoiceGenerateInvoicePost(this.invoice).subscribe (
            () => {
            },
            error => {
                console.log(error);
                this.showError();
            },
            () => {
                this.showSuccess();
            }
        );

    }

    viewPDF(quotation : QuotationResponseModel){
        sessionStorage.setItem('viewQuotation', JSON.stringify(quotation));
        this.router.navigateByUrl('/view-quotation-pdf');
    }

    pageChanged(event){
        this.config.currentPage = event;
    }

    disableButton ( value: string): boolean {
        if(value == 'Accepted' ||
            value == 'Rejected'||
            value == 'Pending Client Approval'){
            return false;
        }else {
            return true;
        }

    }


    showSuccess() {
      this.toastr.success('Process successfully completed', 'Success', {
          timeOut: 3000,
      });
        this.isLoading = false;
    }

    showError() {
      this.toastr.error('Ops, an error occurred. Please try again.', 'Error!!!', {
          timeOut: 3000,
      });
        this.isLoading = false;
    }

}
