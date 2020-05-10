import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, OnChanges {

  private password: string;
  private confirmPassword: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

      var passwordValidator = require('password-validator');

      var schema = new passwordValidator();

      schema
          .is().min(8)                                    // Minimum length 8
          .is().max(100)                                  // Maximum length 100
          .has().uppercase()                              // Must have uppercase letters
          .has().lowercase()                              // Must have lowercase letters
          .has().digits()                                 // Must have digits
          .has().not().spaces()                           // Should not have spaces
          .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

      console.log(schema.validate('validPASS123'));
      console.log(schema.validate('invalidPASS'));
      console.log(schema.validate('joke', { list: true }));
  }

}
