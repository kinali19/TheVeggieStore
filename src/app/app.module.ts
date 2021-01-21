import { MaterialModule } from './material.module';
import { InitialState, initialState } from './../store/reducer';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent, } from './product/product.component';
import { ShopReducer } from 'src/store/reducer';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CartComponent } from './cart/cart.component';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
// import { reducers } from "src/store";
import { localStorageSync } from 'ngrx-store-localstorage';

// export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
//   return localStorageSync({keys: ['cart-items']})(reducer);
// }
// const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProductComponent,
    ProductListComponent,
    LoginComponent,
    CartComponent
  ],
  imports: [
    // CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    // Initialize Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    //  AngularFireAuthModule,
    //  StoreModule.forRoot(reducers, { metaReducers })


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<InitialState>) {
    ngRedux.configureStore(ShopReducer, initialState)
  }
}
