import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Product } from '../product/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private ref:ChangeDetectorRef) { }
  @Input() fruits : Array<Product>

  ngOnInit(): void {
    this.ref.detectChanges();
  }

}
