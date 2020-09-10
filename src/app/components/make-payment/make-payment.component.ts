import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {
  heading = 'Payments';
  subheading = 'View and manage payments';
  icon = 'pe-7s-home icon-gradient bg-tempting-azure';

  isLoading = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
