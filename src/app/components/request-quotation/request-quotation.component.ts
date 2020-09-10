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
    private focusAreas: Array<any> = [];
    private selectedFocusArea: string;
    private products: Array<any> = [];
    private selectedProduct: string;
    private selectedQuantity: number;
    private termsConditions: boolean = false;
    private quotation: QuotationModel= <QuotationModel> {};
    private productsArray: Array<QuotationItemEntity> = [];
    private newProduct: QuotationItemEntity  = {};

    constructor(private quotationService: QuotationService, private productsService: ProductsService, private router: Router,private toastr: ToastrService) {
    }


    ngOnInit() {
        this.selectedFocusArea = 'Physical Metallurgy';
        this.selectedProduct = 'Non Testing Act (Phys)';
        this.selectedQuantity = 1;
        this.quotation.description = '';

        this.getFocusArea();
        this.getProducts(this.selectedFocusArea);
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    getFocusArea(){
        this.productsService.apiProductsFocusAreasGet().subscribe (
            (data: any) => {
                this.focusAreas = data
            },
            error => {
                console.log(error);
            },
            () => {
            }
        )

    }

    getProducts(focusArea: any){

        this.selectedFocusArea = focusArea;
        this.products = [];


        this.productsService.apiProductsProductsFocusAreaGet(focusArea).subscribe (
            (data: any ) => {
                this.products = data
            },
            error => {
                console.log(error);
            },
            () => {
            }
        )
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

    changeProduct(value){
        this.selectedProduct = value;
    }

    changeQuantity(value){
        this.selectedQuantity = Number(value);
    }

    addItem() {
        this.newProduct = {
            id:0,
            focusArea: this.selectedFocusArea,
            item: this.selectedProduct,
            numberOfTests: 0,
            unit_Price: 0,
            quantity: this.selectedQuantity,
            total: 0,
            quote_reference: ''
        };
        this.productsArray.push(this.newProduct);
        this.toastr.success('New row added successfully', 'New product');
        return true;
    }

    deleteItem(index) {
        this.productsArray.splice(index, 1);
        this.toastr.warning('Product deleted successfully', 'Delete product');
        return true;
    }

    acceptTermsAndConditions(){
        this.termsConditions = !this.termsConditions;
    }

}
