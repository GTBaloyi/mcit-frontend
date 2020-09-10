import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ClientRegistrationRequestModel, InvoiceService, QuotationResponseModel} from "../../services";
import {InvoiceRequestModel} from "../../services/model/models";
import {Subject} from "rxjs";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
    heading = 'Invoices';
    subheading = 'View all invoices';
    icon = 'pe-7s-note2 icon-gradient bg-tempting-azure';

    isLoading = new Subject<boolean>();
    private invoices: Array<InvoiceRequestModel> = [];
    private userInformation : ClientRegistrationRequestModel =  <ClientRegistrationRequestModel>'' ;
    private filter : string;
    private config: any;

    constructor( private router: Router,private toastr: ToastrService, private invoiceService: InvoiceService) {
        sessionStorage.removeItem('viewInvoice');
    }

    ngOnInit() {
        this.userInformation  = JSON.parse(sessionStorage.getItem("userInformation"));
        this.getInvoices();

        this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.invoices.length
        };
    }

    getInvoices(){
        this.isLoading.next(true);

        this.invoiceService.apiInvoiceInvoiceCompanyRegistrationGet(this.userInformation.companyRegistrationNumber).subscribe (
            (data: any) => {
                this.invoices = data;
            },
            error => {

                console.log(error);
                this.isLoading.next(false);
                this.showError();

            },
            () => {
                this.isLoading.next(false);
                this.showSuccess();
            }
        );

    }

    pageChanged(event){
        this.config.currentPage = event;
    }


    showSuccess() {
        this.toastr.success('Process successfully completed', 'Success', {
            timeOut: 3000,
        });
    }

    showError() {
        this.toastr.error('Ops, an error occurred. Please try again.', 'Error!!!', {
            timeOut: 3000,
        });
    }

    viewPDF(invoice : InvoiceRequestModel){
        sessionStorage.setItem('viewInvoice', JSON.stringify(invoice));
        this.router.navigateByUrl('/view-invoice-pdf');
    }

}
