import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { ClientReg } from 'src/app/models/client-reg.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent implements OnInit{

 
user: ClientReg

ngOnInit(){
  this.resetForm();

 }

 resetForm (form?:NgForm)
 {
   if(form !=null)
form.reset();
this.user = {
  Username:'',
  email:'',
  NameOfCompany:'',
  VatNumberIdentification:'',
  PhoneNumber:'',
  Password:'',
  ConfirmPasword:'',
  AddressLine1:'',
  AdrdressLine2:'',
  Province:'',
  City:''

  }

 }

}

