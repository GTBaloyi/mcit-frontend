import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {LoginResponseModel, ProductsService, QuotationModel, QuotationService} from "../../services";
import {QuotationItemEntity} from "../../services/model/quotationItemEntity";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {QuotationResponseModel} from "../../services/model/models";

@Component({
  selector: 'app-view-quotation',
  templateUrl: './view-quotation.component.html',
  styleUrls: ['./view-quotation.component.scss']
})
export class ViewQuotationComponent implements OnInit {

  isLoading = new Subject<boolean>();
  private quotationsArray: Array<QuotationResponseModel> = [];
  private username : any;

  constructor(private quotationService: QuotationService, private productsService: ProductsService, private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
      this.username  = JSON.parse(sessionStorage.getItem("username"));
      this.getQuotation();
  }

  getQuotation(){
      this.isLoading.next(true);

      this.quotationService.apiQuotationQuotesEmailGet(this.username).subscribe (
          (data: any) => {
            this.quotationsArray = data;
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
      )

  }

  viewPDF(quotation : QuotationResponseModel){
      this.router.navigate(['/view-quotation-pdf'], {state:{quotation: quotation}});
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

}
