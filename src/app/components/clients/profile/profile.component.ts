/*
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    displayedColumns: string[] = ['reference', 'issuedOn', 'billTo', 'status', 'total', 'Actions'];
    dataSource = new MatTableDataSource(quotations);
    search: string = '';

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor() {

    }

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }


    applyFilter(value: string) {
        const filterValue = value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    profileDetails(profile: any) {
        console.log('checking what value it contains: ', profile)
    }

}


const quotations: any= [
    {reference: 1, issuedOn: 'Hydrogen', billTo: 'Hydrogen', status: 'Hydrogen', total: 'Hydrogen',} ,
    {reference: 2, issuedOn: 'Hydrogen', billTo: 'Hydrogen', status: 'Hydrogen', total: 'Hydrogen',} ,
    {reference: 3, issuedOn: 'Hydrogen', billTo: 'Hydrogen', status: 'Hydrogen', total: 'Hydrogen',} ,
    {reference: 4, issuedOn: 'Hydrogen', billTo: 'Hydrogen', status: 'Hydrogen', total: 'Hydrogen',} ,
    {reference: 5, issuedOn: 'Hydrogen', billTo: 'Hydrogen', status: 'Hydrogen', total: 'Hydrogen',} ,
];
*/
