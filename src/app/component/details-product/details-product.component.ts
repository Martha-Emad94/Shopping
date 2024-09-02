import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiProuctService } from '../../services/Product/api-prouct.service';
import { CartService } from '../../services/cart/cart.service';


@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  providers: [ApiProuctService,CartService],
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.scss'
})
export class DetailsProductComponent implements OnInit {
  productId:number=0;
  FilterProduct:Iproduct|undefined;
  totalproduct:number=0;
  loading:boolean=false;
  constructor(private productService: ApiProuctService,private router:Router,private rout:ActivatedRoute,
    private cartservice:CartService
  ){

  }
  ngOnInit(): void {
   
    this.productService.getAllProducts().subscribe(FilterProduct=>
    {
      this.totalproduct=FilterProduct.length;
    }
    )
    this.productId=Number(this.rout.snapshot.paramMap.get('id'));
    this.loading=true;
    console.log(this.productId)
    if(this.productId){
      this.FetchProductId(this.productId)
      
    }
   
    
  }
  FetchProductId(id:number){
    this.productService.getProductId(id).subscribe({
      next:(res)=>{
       
        this.FilterProduct=res
        this.loading=false;
        console.log(this.FilterProduct)
      },
      error:(error)=>{
        console.log(error);
        this.loading=false;
      }
      
    }) 
  }
  addToCart(){
    console.log('Product added to cart:', this.FilterProduct);
    if (this.FilterProduct) {
      this.cartservice.addToCart(this.FilterProduct); // إضافة المنتج إلى العربة
      console.log('Product added to cart:', this.FilterProduct);
      alert("Product added to Cart successfully!")
    }
  }
 
  Back(){
    this.router.navigateByUrl("Product");
  }
  prev(){
    this.productId=Number(this.rout.snapshot.paramMap.get('id'));
    const prev=this.productId-1;
    if (prev > 0 ) {
      this.FetchProductId(prev);
      this.router.navigateByUrl(`Details/${prev}`);
     
    } 
  }
  next(){
    this.productId=Number(this.rout.snapshot.paramMap.get('id'));
    const next=this.productId+1;
    if (next <= this.totalproduct) {
      this.FetchProductId(next);
      this.router.navigateByUrl(`Details/${next}`);
      
    } 
  }
}
