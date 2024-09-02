import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetailsProductComponent } from '../details-product/details-product.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule,CommonModule,DetailsProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  constructor(private router:Router ,private cartService:CartService){}
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price, 0);
    });
  }
  handleAddToCart(product: any) {
    this.cartService.addToCart(product);
  }

  routerHome() {
    this.router.navigateByUrl('/home');
  }
}
