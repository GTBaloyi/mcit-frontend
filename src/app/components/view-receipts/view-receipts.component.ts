import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  ClientRegistrationRequestModel,
  InvoiceRequestModel, InvoiceResponseModel,
  InvoiceService,
  PaymentResponseModel,
  PaymentService
} from "../../services";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import moment = require('moment');

@Component({
  selector: 'app-view-receipts',
  templateUrl: './view-receipts.component.html',
  styleUrls: ['./view-receipts.component.scss']
})
export class ViewReceiptsComponent implements OnInit {
  heading = 'Receipts';
  subheading = 'View and manage receipts';
  icon = 'pe-7s-news-paper icon-gradient bg-tempting-azure';

  private config: any;
  private filter : string;
  isLoading = true;
  private payments: Array<PaymentResponseModel> = [];
  private invoice: InvoiceResponseModel =<InvoiceResponseModel> '';
  private payment: PaymentResponseModel = <PaymentResponseModel> '';
  private userInformation : ClientRegistrationRequestModel =  <ClientRegistrationRequestModel>'' ;


  constructor( private router: Router,
               private toastr: ToastrService,
               private modalService: NgbModal,
               private invoiceService: InvoiceService,
               private paymentService: PaymentService) {

  }

  ngOnInit() {
    this.userInformation  = JSON.parse(sessionStorage.getItem("userInformation"));
    this.getPayments();

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.payments.length
    };
  }

  getPayments(){
    this.isLoading = true;

    this.paymentService.apiPaymentByCompanyCompanyRegistrationGet(this.userInformation.companyRegistrationNumber).subscribe (
        (data: any) => {
          this.payments = data;
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


  get sortData(): Array<PaymentResponseModel> {
    return this.payments.sort((invoiceUnsorted, invoiceSorted) => {
      return <any>new Date(invoiceSorted.dateOfPayment) - <any>new Date(invoiceUnsorted.dateOfPayment);
    });
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  openModal(value: any, data: any) {
    this.payment = data;
    this.getInvoice(this.payment.invoiceReference);
    this.modalService.open( value);
  }

  getInvoice(reference){
    this.isLoading = true;
    this.invoiceService.apiInvoiceInvoiceByReferenceInvoiceReferenceGet(reference).subscribe (
        (data: any) => {
          this.invoice = data;
        },
        error => {
          this.isLoading = false;
          console.log(error);
        },
        () => {
          this.isLoading = false;

        }
    );
  }

  public convertToPDF() {
    this.isLoading = true;

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

      pdf.save('Receipt-'+date+'.pdf');

      this.isLoading = false;
    });
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
