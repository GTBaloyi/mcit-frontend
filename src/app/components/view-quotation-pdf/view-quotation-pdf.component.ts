import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import moment = require('moment');
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import {ProductsService, QuotationService} from "../../services";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {QuotationResponseModel} from "../../services/model/models";


@Component({
  selector: 'app-view-quotation-pdf',
  templateUrl: './view-quotation-pdf.component.html',
  styleUrls: ['./view-quotation-pdf.component.scss']
})
export class ViewQuotationPdfComponent implements OnInit {

    @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
    quotation: QuotationResponseModel = <QuotationResponseModel>'';


    constructor(private quotationService: QuotationService, private productsService: ProductsService, private router: Router,private toastr: ToastrService) {

        if(this.router.getCurrentNavigation().extras.state != undefined) {
            this.quotation = this.router.getCurrentNavigation().extras.state.quotation;
        }else{
            this.router.navigateByUrl('/view-quotation');
        }

    }

    ngOnInit() {

        console.log('checking  if quote has value: ', this.quotation)
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
}
