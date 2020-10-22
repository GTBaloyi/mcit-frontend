import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ClientRegistrationRequestModel, InvoiceService, PaymentRequestModel, PaymentService,} from "../../services";
import {InvoiceRequestModel} from "../../services/model/models";
import {Subject} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
    heading = 'Invoices';
    subheading = 'View all invoices';
    icon = 'pe-7s-note2 icon-gradient bg-tempting-azure';

    private file: any;
    private path: string;
    private config: any;
    private filter : string;
    private fileName: string;
    private amountPayed: number;
    private reference: string = '';
    isLoading = true;
    private paymentMethod: string = '';
    private companyRegistration: string = '';
    private invoices: Array<InvoiceRequestModel> = [];
    private paymentMethods = ['Cash','Check','Bank transfer','Online','Other'];
    private userInformation : ClientRegistrationRequestModel =  <ClientRegistrationRequestModel>'' ;


    constructor( private router: Router,
                 private toastr: ToastrService,
                 private modalService: NgbModal,
                 private invoiceService: InvoiceService,
                 private paymentService : PaymentService) {
        sessionStorage.removeItem('viewInvoice');
    }

    ngOnInit() {
        this.userInformation  = JSON.parse(sessionStorage.getItem("userInformation"));
        this.getInvoices();
        this.paymentMethod = 'Cash';

        this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.invoices.length
        };
    }

    makePayment(paymentDetails){
        this.isLoading = true;

        this.paymentService.apiPaymentCreatePost(paymentDetails).subscribe (
            () => {
            },
            error => {
                console.log(error);
                this.isLoading = false;
                this.showError();
            },
            () => {
                this.isLoading = false;
                this.showSuccess();
            }
        );

    }

    uploadPop(){
        const paymentDetails: PaymentRequestModel = {};

        //Files
        var fileExtension = '.' + this.file.name.split('.').pop();
        this.fileName = "payment_"+ this.companyRegistration +"_"+this.file.lastModified+"_"+fileExtension

        //Details
        paymentDetails.approvedBy = '';
        paymentDetails.status = 'Pending';
        paymentDetails.amount = this.amountPayed;
        paymentDetails.paymentType = this.paymentMethod;
        paymentDetails.invoiceReference = this.reference;
        paymentDetails.companyRegistration = this.companyRegistration;
        paymentDetails.proofOfPaymentURL = "https://mcts-storage.s3.us-east-2.amazonaws.com/proof-of-payment/" + this.fileName;

        this.isLoading = true;

        this.paymentService.apiPaymentUploadPopPost(this.fileName, this.file).subscribe (
            () => {
            },
            error => {
                if(error.status == 200) {
                    this.makePayment(paymentDetails)
                    this.modalService.dismissAll();

                    this.file= null;
                    this.fileName= '';
                    this.amountPayed = null;
                    this.reference = '';

                    this.isLoading = false;
                }else{
                    console.log(error);
                    this.isLoading = false;
                    this.showError();
                }
            },
            () => {
                this.isLoading = false;
            }
        );

    }

    getInvoices(){
        this.isLoading = true;

        this.invoiceService.apiInvoiceInvoiceCompanyRegistrationGet(this.userInformation.companyRegistrationNumber).subscribe (
            (data: any) => {
                this.invoices = data;
            },
            error => {

                console.log(error);
                this.isLoading = false;
                this.showError();
            },
            () => {
                this.sortData;
                this.isLoading = false;
                this.showSuccess();
            }
        );
    }

    get sortData(): Array<InvoiceRequestModel> {
        return this.invoices.sort((invoiceUnsorted, invoiceSorted) => {
            return <any>new Date(invoiceSorted.invoice_date) - <any>new Date(invoiceUnsorted.invoice_date);
        });
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

    openModal(value: any, data: any) {
        this.reference =  data.reference;
        this.companyRegistration = data.company_registration;
        this.modalService.open( value);
    }

    fileEvent(fileInput: any){
        this.file = fileInput.target.files[0];
    }
}
