/*
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'companyName', 'contactName', 'contactNumber', 'email', 'Address', 'Actions'];
  dataSource = new MatTableDataSource(clients);
  search: string = '';

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router, private profileComponent: ProfileComponent) { }

  ngOnInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  applyFilter(value: string) {
      const filterValue = value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openProfile(profile: any){
      this.profileComponent.profileDetails(profile);
      this.router.navigateByUrl('/profile');
  }


}

const clients: any= [
    {position: 1, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 2, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 3, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 4, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 5, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 6, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 7, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 8, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 9, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 10, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 11, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 12, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 13, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 14, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 15, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'},
    {position: 16, companyName: 'Hydrogen', contactName: 'Hydrogen', contactNumber: 'Hydrogen', email: 'Hydrogen', Address: 'Hydrogen'}

];


*/
