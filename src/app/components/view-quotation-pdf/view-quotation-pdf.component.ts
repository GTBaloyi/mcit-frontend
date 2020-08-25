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

    @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
    isLoading = new Subject<boolean>();
    quotation: QuotationResponseModel = <QuotationResponseModel>'';
    private userInformation : ClientRegistrationRequestModel =  <ClientRegistrationRequestModel>'' ;
    private showModal: boolean;


    constructor(private quotationService: QuotationService,
                private productsService: ProductsService,
                private router: Router,
                private toastr: ToastrService,
                private invoiceService: InvoiceService) {

        if(this.router.getCurrentNavigation().extras.state != undefined) {
            this.quotation = this.router.getCurrentNavigation().extras.state.quotation;
        }else{
            this.router.navigateByUrl('/view-quotation');
        }

    }

    ngOnInit() {

    }


    public convertToPDF() {
        let date = moment().format("YYYY-MM-DD");
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
                this.isLoading.next(false);
                this.showError();

            },
            () => {
                this.isLoading.next(false);
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
                this.isLoading.next(false);
                this.showError();
            },
            () => {
                this.isLoading.next(false);
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
        let date = moment().format("YYYY-MM-DD");
        this.userInformation  = JSON.parse(sessionStorage.getItem("userInformation"));

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

        this.isLoading.next(true);
        this.invoiceService.apiInvoiceGenerateInvoicePost(invoice).subscribe (
            () => {
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
}
