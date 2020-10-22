import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {ClientRegistrationRequestModel, ClientsService, UsersService} from "../../services";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  heading = 'My Account';
  subheading = 'Update account information';
  icon = 'pe-7s-id icon-gradient bg-tempting-azure';

  isLoading = new Subject<boolean>();
  private userInformation: ClientRegistrationRequestModel;
  private titles: Array<string> = ['Mr', 'Mrs', 'Miss', 'Ms', 'Sir', 'Dr'];
  private genders: Array<string> = ['Male', 'Female', 'Other'];
  private companyProfiles: Array<string> = ['Small', 'Large', 'HEIs/Science Council', 'Techno/Star-Entrepreneur'];


  constructor(private router: Router,
              private toastr: ToastrService,
              private clientService: ClientsService,
              private usersService: UsersService) {
    this.userInformation = JSON.parse(sessionStorage.getItem("userInformation"));

  }

  ngOnInit() {
  }

  updateClient(editClient) {
    this.isLoading.next(true);
    this.clientService.apiClientsUpdateClientPut(editClient).subscribe(
        () => {
        },
        error => {
          if (error.status == 200) {
            this.getClient();
          } else {
            console.log(error);
            this.showError();
          }
        },
        () => {
          this.getClient();
        }
    );

  }

  getClient() {
    this.isLoading.next(true);
    this.clientService.apiClientsByEmailEmailGet(this.userInformation.contactEmail).subscribe(
        (data: ClientRegistrationRequestModel) => {
          this.userInformation = data;
          sessionStorage.setItem('userInformation', JSON.stringify(data));
        },
        err => {
        },
        () => {
          this.isLoading.next(false);
        }
    );

  }

  showSuccess() {
    this.isLoading.next(false);
    this.toastr.success('Process successfully completed', 'Success', {
      timeOut: 3000,
    });
  }

  showError() {
    this.isLoading.next(false);
    this.toastr.error('Ops, an error occurred. Please try again.', 'Error!!!', {
      timeOut: 3000,
    });
  }

}
