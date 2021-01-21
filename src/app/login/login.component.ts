import { ProductComponent } from './../product/product.component';
import { AuthService } from './../auth.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import firebase from '@firebase/app';
import '@firebase/auth';
import { environment } from 'src/environments/environment.prod';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../product/product';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { NgRedux } from '@angular-redux/store';
import { InitialState } from 'src/store/reducer';
import { AddToCart } from 'src/store/action';


export class PhoneNumber {
  country: string;
  line: string;

  // format phone numbers as E.164
  get e164() {
    const num = "+91" + this.line
    return `+${num}`
  }

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public recaptchaVerifier: any;
  otpSent: boolean = false
  verificationCode: string;
  phoneNumber = new PhoneNumber()
  error = null
  public windowRef: any;
  user: any;
  selectedItem : Product
  inCart: boolean;


  constructor(private auth: AuthService, private dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private ngRedux: NgRedux<InitialState>
  ) { }

  ngOnInit() {
    this.windowRef = window
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier
      .render()
      .then(widgetId => {
        this.windowRef.recaptchaWidgetId = widgetId
      });
      this.selectedItem = this.data
  }



  sendOtp() {
    const phoneNumberString = this.phoneNumber.e164;
    const appVerifier = this.windowRef.recaptchaVerifier;

//  this.windowRef.confirmationResult = this.auth.SignIn(phoneNumberString)


    firebase.auth()
      .signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
       this.auth.setCurrentUser(this.phoneNumber.e164)
      })
      .catch(error => console.log(error));

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        this.user = result.user;
        if (this.user != undefined) {
          this.recaptchaVerifier = null
          this.dialogRef.close();
          if(this.selectedItem != undefined){
            this.ngRedux.dispatch(AddToCart(this.selectedItem))
            this.inCart = true
          }
        }
      })
      .catch(error => console.log(error, "Incorrect code entered?"));
  }

}
