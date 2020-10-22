import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ProductsService, QuotationModel, QuotationResponseModel, QuotationService} from "../../services";
import {Subject} from "rxjs";
import {QuotationItemEntity} from "../../services";
import moment = require('moment');



@Component({
  selector: 'app-request-quotation',
  templateUrl: './request-quotation.component.html',
  styleUrls: ['./request-quotation.component.scss']
})
export class RequestQuotationComponent implements OnInit, OnChanges {
    heading = 'Quotation';
    subheading = 'Request a quotation';
    icon = 'pe-7s-calculator icon-gradient bg-tempting-azure';

    isLoading = new Subject<boolean>();
    private selectedFocusArea: string;
    private selectedProduct: string;
    private selectedQuantity: number;
    private termsConditions: boolean = false;
    private quotation: QuotationModel= <QuotationModel> {};
    private productsArray: Array<QuotationItemEntity> = [];

    constructor(private quotationService: QuotationService, private productsService: ProductsService, private router: Router,private toastr: ToastrService) {
    }


    ngOnInit() {
        this.selectedFocusArea = 'Physical Metallurgy';
        this.selectedProduct = 'Non Testing Act (Phys)';
        this.selectedQuantity = 1;
        this.quotation.description = '';
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    requestQuotation(){
        if (this.termsConditions) {
            this.isLoading.next(true);

            let date = moment().format("yyyy-MM-DD");

            this.quotation.quote_id = 0;
            this.quotation.quote_reference = '';
            this.quotation.date_generated = date.toString();
            this.quotation.quote_expiryDate = date.toString();
            this.quotation.subTotal = 0;
            this.quotation.discount = 0;
            this.quotation.vatAmount = 0;
            this.quotation.grand_total = 0;
            this.quotation.generatedBy = '';
            this.quotation.approvedBy = '';
            this.quotation.items = this.productsArray;
            this.quotation.status = 'Pending';

            this.quotationService.apiQuotationCreateQuotePost(this.quotation).subscribe(
                (data: any) => {
                    data;
                },
                error => {
                    if (error.status == 200) {
                        this.isLoading.next(false);
                        this.showSuccess();
                        this.router.navigateByUrl('/landing-page');

                    } else {
                        console.log(error);
                        this.isLoading.next(false);
                        this.showError();
                    }
                },
                () => {
                    this.isLoading.next(false);
                    this.showSuccess();
                    this.router.navigateByUrl('/landing-page');
                }
            )
        } else {
            this.toastr.error('Please accept our terms and conditions then, try again.', 'Error!!!', {
                timeOut: 3000,
            });
        }
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

    acceptTermsAndConditions(){
        this.termsConditions = !this.termsConditions;
    }

}
