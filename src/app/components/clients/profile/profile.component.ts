import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private profile: any;

  constructor(private FormBuilder: FormBuilder) {
      this.profile = FormBuilder.group({
          company : '',
          companyName : '',
          vatNumber : '',
          phone : '',
          address : '',
          email : ''
      });
  }

  ngOnInit(): void {
  }

  profileDetails(profile: any){
      profile : FormGroup;

      this.profile;
      console.log('checking what value it contains: ', profile)

  }

}
