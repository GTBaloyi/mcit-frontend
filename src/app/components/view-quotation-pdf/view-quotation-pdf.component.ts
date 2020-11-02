import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import moment = require('moment');
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import {
    ClientRegistrationRequestModel,
    InvoiceRequestModel,
    InvoiceService,
    ProductsService,
    QuotationService
} from "../../services";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {QuotationResponseModel} from "../../services/model/models";
import {Subject} from "rxjs";


@Component({
  selector: 'app-view-quotation-pdf',
  templateUrl: './view-quotation-pdf.component.html',
  styleUrls: ['./view-quotation-pdf.component.scss']
})
export class ViewQuotationPdfComponent implements OnInit {
    heading = 'Quotation';
    subheading = 'View all quotations';
    icon = 'pe-7s-calculator icon-gradient bg-tempting-azure';

    @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
    isLoading = new Subject<boolean>();
    quotation: QuotationResponseModel = <QuotationResponseModel>'';
    public userInformation : ClientRegistrationRequestModel =  <ClientRegistrationRequestModel>'' ;
    public showModal: boolean;


    constructor(public quotationService: QuotationService,
                public productsService: ProductsService,
                public router: Router,
                public toastr: ToastrService,
                public invoiceService: InvoiceService) {

        this.quotation =  JSON.parse(sessionStorage.getItem("viewQuotation"));
        this.userInformation  = JSON.parse(sessionStorage.getItem("userInformation"));
    }

    ngOnInit() {

    }


    public convertToPDF() {
        this.isLoading.next(true);

        let date = moment().format("yyyy-MM-DD");
        let data = document.getElementById('pdfTable');

        html2canvas(data).then(canvas => {
            let imgWidth = 200;
            let pageHeight = 395;
            let imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png');
            let pdf = new jsPDF('p', 'mm', 'a4');
            let position = 3;

            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

            pdf.save('Quotation-'+date+'.pdf');

            this.isLoading.next(false);
        });
    }

    show() {
        this.showModal = true;
    }

    hide() {
        this.showModal = false;
    }


    acceptQuotation(quotation){
        quotation.status = "Accepted";
        this.isLoading.next(true);
        this.quotationService.apiQuotationUpdateQuotePut(quotation).subscribe (
            () => {
            },
            error => {
                console.log(error);
                this.showError();

            },
            () => {
                this.generateInvoice(quotation);
                this.router.navigateByUrl('/view-quotation');
            }
        );
    }

    rejectQuotation(quotation : QuotationResponseModel){
        quotation.status = "Rejected";

        this.isLoading.next(true);
        this.quotationService.apiQuotationUpdateQuotePut(quotation).subscribe (
            () => {
            },
            error => {
                console.log(error);
                this.showError();
            },
            () => {
                this.showSuccess();
                this.hide();
                this.router.navigateByUrl('/view-quotation');
            }
        );
    }

    disableButton ( value: string): boolean {
        if(value == 'Pending Client Approval'){
            return false;
        }else {
            return true;
        }

    }

    generateInvoice(quotation : QuotationResponseModel){
        this.isLoading.next(true);

        let date = moment().format("yyyy-MM-DD");

        let invoice : InvoiceRequestModel = {};


        invoice.id = 0;
        invoice.reference = '';
        invoice.invoice_date = date;
        invoice.date_due = date;
        invoice.daysBeforeExpiry = 30;
        invoice.quotation_Reference = quotation.quote_reference;
        invoice.vat_percentage = quotation.vat;
        invoice.bill_address = quotation.bill_address;
        invoice.vat = quotation.vat_Amount;
        invoice.discount = quotation.discount;
        invoice.subtotal = quotation.sub_Total;
        invoice.grand_total = quotation.grand_total;
        invoice.company_registration = this.userInformation.companyRegistrationNumber;
        invoice.generatedBy = '';
        invoice.approvedBy = '';

        this.invoiceService.apiInvoiceGenerateInvoicePost(invoice).subscribe (
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

    showSuccess() {
        this.toastr.success('Process successfully completed', 'Success', {
            timeOut: 3000,
        });
        this.isLoading.next(false);
    }

    showError() {
        this.toastr.error('Ops, an error occurred. Please try again.', 'Error!!!', {
            timeOut: 3000,
        });
        this.isLoading.next(false);
    }
}
