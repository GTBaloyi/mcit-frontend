import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ClientRegistrationRequestModel, ProductsService, QuotationModel, QuotationService} from "../../services";
import {QuotationItemEntity} from "../../services/model/quotationItemEntity";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import moment = require('moment');

@Component({
  selector: 'app-create-quotation',
  templateUrl: './create-quotation.component.html',
  styleUrls: ['./create-quotation.component.scss']
})
export class CreateQuotationComponent implements OnInit {
    heading = 'Quotation';
    subheading = 'Request a quotation';
    icon = 'pe-7s-calculator icon-gradient bg-tempting-azure';


    isLoading = new Subject<boolean>();
    public selectedFocusArea: string;
    public selectedProduct: string;
    public selectedQuantity: number;
    public quotation: QuotationModel = <QuotationModel>{};
    public productsArray: Array<QuotationItemEntity> = [];
    public userInformation: ClientRegistrationRequestModel = <ClientRegistrationRequestModel>{};


    constructor(public quotationService: QuotationService, public productsService: ProductsService, public router: Router, public toastr: ToastrService) {
        this.userInformation = JSON.parse(sessionStorage.getItem("userInformation"));
    }


    ngOnInit() {
        this.selectedFocusArea = 'Physical Metallurgy';
        this.selectedProduct = 'Non Testing Act (Phys)';
        this.selectedQuantity = 1;

        this.quotation.company_name = this.userInformation.companyName;
        this.quotation.phone_number = this.userInformation.contactNumber;
        this.quotation.email = this.userInformation.contactEmail;
        this.quotation.company_Registration = this.userInformation.companyRegistrationNumber;
    }

    requestQuotation() {
        this.isLoading.next(true);

        let date = moment().format("yyyy-MM-DD");

        this.quotation.quote_reference = '';
        this.quotation.date_generated = date.toString();
        this.quotation.quote_expiryDate = date.toString();
        this.quotation.subTotal = 0;
        this.quotation.discount = 0;
        this.quotation.vatAmount = 0;
        this.quotation.grand_total = 0;
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
                    this.router.navigateByUrl('/view-quotation');

                } else {
                    console.log(error);
                    this.isLoading.next(false);
                    this.showError();
                }
            },
            () => {
                this.isLoading.next(false);
                this.showSuccess();
                this.router.navigateByUrl('/view-quotation');
            }
        )

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
