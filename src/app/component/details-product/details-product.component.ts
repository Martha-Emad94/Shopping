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
  selectedQuantity: number=0;
  isFavorite: boolean = false;
  showMessage: boolean=false;
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
    if (this.FilterProduct && this.selectedQuantity > 0 && this.selectedQuantity <= this.FilterProduct.rating.count) {
      this.FilterProduct.rating.count -= this.selectedQuantity;
      this.cartservice.addToCart({ ...this.FilterProduct, quantity: this.selectedQuantity });
     this.showSuccessMessage();
    } else {
      alert("Invalid quantity selected.");
    }
  }
  toggleFavorite(){
    this.isFavorite = !this.isFavorite;
  }
  showSuccessMessage() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000); // أخفي الرسالة بعد 3 ثوانٍ
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
