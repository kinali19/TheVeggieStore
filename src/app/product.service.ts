import { LoadItems } from '../store/action';
import { InitialState } from '../store/reducer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Product } from './product/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private paramSource = new BehaviorSubject(null);
  sharedParam = this.paramSource.asObservable();



  constructor(private http: HttpClient,private ngRedux: NgRedux<InitialState>) { }

  getAll(){
    this.http.get('http://localhost:4000/fruits')
    .subscribe((products: Array<Product>) => {
            this.ngRedux.dispatch(LoadItems(products))
    });
  }

  sendCartDetails(cart:Array<Product>){
    this.paramSource.next(cart)
  }
}
