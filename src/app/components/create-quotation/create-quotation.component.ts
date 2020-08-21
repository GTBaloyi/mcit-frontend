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

    isLoading = new Subject<boolean>();
    private focusAreas: Array<any> = [];
    private selectedFocusArea: string;
    private products: Array<any> = [];
    private selectedProduct: string;
    private selectedQuantity: number;
    private newProduct: QuotationItemEntity  = {};
    private quotation: QuotationModel= <QuotationModel> {};
    private productsArray: Array<QuotationItemEntity> = [];
    private userInformation : ClientRegistrationRequestModel = <ClientRegistrationRequestModel> {};


    constructor(private quotationService: QuotationService, private productsService: ProductsService, private router: Router,private toastr: ToastrService) {
        this.userInformation  = JSON.parse(sessionStorage.getItem("userInformation"));
    }


    ngOnInit() {
        this.selectedFocusArea = 'Physical Metallurgy';
        this.selectedProduct = 'Non Testing Act (Phys)';
        this.selectedQuantity = 1;

        this.quotation.company_name = this.userInformation.companyName;
        this.quotation.phone_number = this.userInformation.contactNumber;
        this.quotation.email = this.userInformation.contactEmail;
        this.quotation.company_Registration = this.userInformation.companyRegistrationNumber;

        this.getFocusArea();
        this.getProducts(this.selectedFocusArea);
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
        this.isLoading.next(true);

        let date = moment().format("YYYY-MM-DD");

        this.quotation.quote_reference = '';
        this.quotation.date_generated = date.toString();
        this.quotation.quote_expiryDate = date.toString();
        this.quotation.subTotal = 0;
        this.quotation.globalDiscount = 0;
        this.quotation.globalTax = 0;
        this.quotation.grand_total = 0;
        this.quotation.items = this.productsArray;
        this.quotation.status = 'Pending';

        this.quotationService.apiQuotationCreateQuotePost(this.quotation).subscribe (
            (data: any) => {
                data;
            },
            error => {
                if(error.status == 200){
                    this.isLoading.next(false);
                    this.showSuccess();
                    this.router.navigateByUrl('/view-quotation');

                }else{
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
        this.toastr.error('Opps, an error occurred. Please try again.', 'Error!!!', {
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

        this.newProduct = {id:0, focusArea: this.selectedFocusArea, item: this.selectedProduct, quantity: this.selectedQuantity, total: 0};
        this.productsArray.push(this.newProduct);
        this.toastr.success('New row added successfully', 'New product');
        return true;
    }

    deleteItem(index) {
        if(this.productsArray.length ==1) {
            this.toastr.error("Can't delete the product when there is only one row", 'Warning');
            return false;
        } else {
            this.productsArray.splice(index, 1);
            this.toastr.warning('Product deleted successfully', 'Delete product');
            return true;
        }
    }
}
