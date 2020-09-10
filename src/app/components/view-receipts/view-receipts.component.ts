import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-view-receipts',
  templateUrl: './view-receipts.component.html',
  styleUrls: ['./view-receipts.component.scss']
})
export class ViewReceiptsComponent implements OnInit {
  heading = 'Receipts';
  subheading = 'View and manage receipts';
  icon = 'pe-7s-news-paper icon-gradient bg-tempting-azure';


  isLoading = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
