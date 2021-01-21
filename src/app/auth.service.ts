import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from '@firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

interface User {
  mobileNumber: String,
  createdDate: Date
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn = false;
  isUserExist = false;
  public message: string;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router,
    private firestore: AngularFirestore) {
    this.loggedIn = !!sessionStorage.getItem('user');

  }



  // Set current user in your session after a successful login
  setCurrentUser(phoneNumber: string): void {
    sessionStorage.setItem('user', phoneNumber.toString());
    this.loggedIn = true;
  }

  // Get currently logged in user from session
  getCurrentUser(): string | any {
    return sessionStorage.getItem('user') || undefined;
  }

  // Clear the session for current user & log the user out
  logout() {
    sessionStorage.removeItem('user');
    this.loggedIn = false;
    // ... other code for logout
  }

  // The method to check whether user is logged in or not
  isLoggedIn() {
    return this.loggedIn;
  }


  LoginWithPhoneNumber(phoneNumber, appVerifier) {
   return firebase.auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(result => {
      if (phoneNumber)
      this.setCurrentUser(phoneNumber)
      ;
    })
    .catch(error => console.log(error));
  }


  LogIn(phoneNumber, otpVerification) {
    debugger
    this.isUserExist = this.CheckUserExistorNot(phoneNumber)
    if (this.isUserExist) {
      const verification = prompt('Enter verification code');
      if (verification != null) {
        firebase.auth().signInWithPhoneNumber(phoneNumber, otpVerification)
          .then((confirmationResult) => {
            const verification = prompt('Enter verification code');
            if (verification != null) {
              confirmationResult.confirm(verification)
                .then(function (result) {
                  if (result.user.phoneNumber)
                    this.setCurrentUser(result.user.phoneNumber)

                }).catch(function (error) {
                });
            }
          })
      }
    }
    else {
      this.message = "User is not exist! please sign in first!"
    }

  }
  CheckUserExistorNot(phoneNumber) {
    this.firestore.collection('users', ref => { console.log(ref.where('mobileNumber', '==', phoneNumber)); return ref.where('mobileNumber', '==', phoneNumber) }).snapshotChanges().subscribe(result => {
      if (result.length > 0) {
        return true;
      }
      else {
        return false;
      }
    });
    return false;
  }

  AddUser(data) {
    debugger
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("users")
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }


}
