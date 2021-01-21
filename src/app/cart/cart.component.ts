import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product';
import { ProductService } from '../product.service';
import { NgRedux } from '@angular-redux/store';
import { DecreaseQty, IncreaseQty, RemoveFromCart } from 'src/store/action';
import { InitialState } from 'src/store/reducer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: Array<Product>

  constructor(private productService: ProductService,private ngRedux: NgRedux<InitialState>) { 
    this.ngRedux
    .select<Array<Product>>('items')
    .subscribe((items: Array<Product>) => {
        console.log(items)
    });

  }

  ngOnInit(): void {
    this.productService.sharedParam.subscribe((items: Array<Product>) => {
      this.cartItems = items;
    })
  
  }

  removeFromCart(item: Product) {
    item.quantity = 0
    item.inCart = false
    this.ngRedux.dispatch(RemoveFromCart(item))
   
  }

  decrementQty(item: Product) {
    if (item.quantity > 1)
      item.quantity = item.quantity - 1;
    else
      item.inCart = false
      this.ngRedux.dispatch(DecreaseQty(item))

  }
  incrementQty(item: Product) {
     item.quantity += 1;
    item.inCart = true
    this.ngRedux.dispatch(IncreaseQty(item))

  }
}

