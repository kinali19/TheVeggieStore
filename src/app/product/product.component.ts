import { AuthService } from './../auth.service';
import { LoginComponent } from './../login/login.component';
import { AddToCart, IncreaseQty, RemoveFromCart, DecreaseQty } from './../../store/action';
import { InitialState } from './../../store/reducer';
import { NgRedux } from '@angular-redux/store';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from './product';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private ngRedux: NgRedux<InitialState>, public dialog: MatDialog
    , private auth: AuthService
  ) { }

  public inCart = false
  isLoggedIn = false

  @Input() product: Product


  ngOnInit(): void {
    this.isLoggedIn = this.auth.loggedIn;
  }




  addToCart(item: Product) {
    item.quantity = 1
    item.inCart = true
    this.ngRedux.dispatch(AddToCart(item))
    // this.ngRedux.dispatch(IncreaseQty(item))

  }

  removeFromCart(item: Product) {
    item.quantity = 0
    this.ngRedux.dispatch(RemoveFromCart(item))
    item.inCart = false
    this.ngRedux.dispatch(DecreaseQty(item))
  }


  openLoginSignUpForm(item: Product) {
    const dialogRef = this.dialog.open(LoginComponent, {
      hasBackdrop: true,
      width: "450px",
      data: item
    });
  }

  decrementQty(item: Product) {
    if (item.quantity > 0) {
      item.quantity = item.quantity - 1;
    
    }
    if (item.quantity === 0) {
        item.inCart = false
      // this.removeFromCart(item)
    }
    this.ngRedux.dispatch(DecreaseQty(item))


  }
  incrementQty(item: Product) {
    item.quantity += 1;
    item.inCart = true
    this.ngRedux.dispatch(IncreaseQty(item))

  }
}
