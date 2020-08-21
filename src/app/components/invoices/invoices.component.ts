import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {InvoiceService} from "../../services";
import {InvoiceRequestModel} from "../../services/model/models";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

    private Invoices: Array<InvoiceRequestModel> = [];
    private filter : string;
    private config: any;

    constructor( private router: Router,private toastr: ToastrService, private invoiceService: InvoiceService) { }

    ngOnInit() {

        this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.Invoices.length
        };
    }

    pageChanged(event){
        this.config.currentPage = event;
    }

}
