import { Product } from './../product/product';
import { ProductService } from '../product.service';
import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { InitialState } from 'src/store/reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private ngRedux: NgRedux<InitialState>,
    private productService:ProductService) { }

    @select('items') items$:  Observable<Array<Product>>;
    
  ngOnInit() {
     return  this.productService.getAll()
  }

}
