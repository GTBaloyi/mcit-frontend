import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import moment = require('moment');
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import {
  ClientRegistrationRequestModel,
  GenericServicesService,
  InvoiceResponseModel,
  InvoiceService,
  PaymentRequestModel,
  PaymentService,
  ProductsService,
  QuotationResponseModel,
  QuotationService
} from "../../services";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Subject} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-view-invoice-pdf',
  templateUrl: './view-invoice-pdf.component.html',
  styleUrls: ['./view-invoice-pdf.component.scss']
})
export class ViewInvoicePdfComponent implements OnInit {
  heading = 'Invoices';
  subheading = 'View and manage all client invoices';
  icon = 'pe-7s-note2 icon-gradient bg-tempting-azure';

  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  public file: any;
  public invoiceFile: any;
  public path: string;
  public config: any;
  public filter : string;
  public fileName: string;
  public showModal: boolean;
  public amountPayed: number;
  public reference: string = '';
  isLoading = new Subject<boolean>();
  public paymentMethod: string = '';
  public companyRegistration: string = '';
  invoice: InvoiceResponseModel = <InvoiceResponseModel>'';
  quotation: QuotationResponseModel = <QuotationResponseModel>'';
  public paymentMethods = ['Cash','Check','Bank transfer','Online','Other'];
  public userInformation : ClientRegistrationRequestModel =  <ClientRegistrationRequestModel>'' ;


  constructor(public quotationService: QuotationService,
              public productsService: ProductsService,
              public router: Router,
              public toastr: ToastrService,
              public invoiceService: InvoiceService,
              public genericService: GenericServicesService,
              public modalService: NgbModal,
              public paymentService : PaymentService) {

      this.invoice = JSON.parse(sessionStorage.getItem("viewInvoice"));
      console.log('invoice: ', this.invoice);

    this.userInformation  = JSON.parse(sessionStorage.getItem("userInformation"));

  }

  ngOnInit() {
    this.paymentMethod = 'Cash';

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

      pdf.save('Invoice-'+date+'.pdf');

      this.isLoading.next(false);
    });
  }


  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }

  openModal(value: any, data: any) {
    this.reference =  data.reference;
    this.companyRegistration = data.company_registration;
    this.modalService.open( value);
  }

  fileEvent(fileInput: any){
    this.file = fileInput.target.files[0];
  }

  makePayment(paymentDetails){
    this.isLoading.next(true);

    this.paymentService.apiPaymentCreatePost(paymentDetails).subscribe (
        () => {
        },
        error => {
          console.log(error);
          this.isLoading.next(false);
          this.showError();
        },
        () => {
          this.isLoading.next(false);
          this.router.navigateByUrl('/invoice');
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

    this.isLoading.next(true);

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

            this.isLoading.next(false);
          }else{
            console.log(error);
            this.isLoading.next(false);
            this.showError();
          }
        },
        () => {
          this.isLoading.next(false);
        }
    );

  }

  emailDocument(){
    this.isLoading.next(true);

    let date = moment().format("yyyy-MM-DD");
    let data = document.getElementById('pdfTable');

     html2canvas(data).then(canvas => {
      let imgWidth = 200;
      let pageHeight = 395;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('pdf');
      let pdf = new jsPDF('p', 'mm', 'a4');
      let position = 3;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

       this.invoiceFile =pdf.convertToPDF();

    });

    this.genericService.apiGenericServicesEmailAttachmentPost(this.userInformation.contactEmail,
        'Invoice from Metal Casting Technology station',
        'Dear '+this.userInformation.companyName+ '\n Please find invoice attached.',
        'Invoice-'+date+'.pdf',
        this.invoiceFile
    ).subscribe (
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

    console.log('file to email: ', this.invoiceFile);
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
