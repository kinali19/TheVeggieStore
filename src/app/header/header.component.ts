import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { InitialState } from 'src/store/reducer';
import { ProductService } from '../product.service';
import { Product } from '../product/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cart: Array<Product>= []

  constructor(private ngRedux: NgRedux<InitialState>,private productService:ProductService) {
    this.ngRedux
      .select<Array<Product>>('cart')
      .subscribe((items: Array<Product>) => {
        this.cart = items;
        this.productService.sendCartDetails(this.cart)
      });
  }
  ngOnInit() {}


}
