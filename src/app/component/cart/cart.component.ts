import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { Iproduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule],
  providers: [CartService],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'] // يجب أن تكون styleUrls وليس styleUrl
})
export class CartComponent implements OnInit {
  cartItems: Iproduct[] = [];
  totalPrice: number = 0;
  totalItems:number=0;
  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
      this.countItems();
      console.log('Cart items updated:', this.cartItems); // تأكيد تحديث العناصر
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }
countItems(){
  this.totalItems = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
}
getCountItems(){
  return this.totalItems;
}
  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
  }


  increaseQuantity(item: Iproduct) {
    item.quantity++;
    this.cartService.updateCart(this.cartItems); 
  }

  decreaseQuantity(item: Iproduct) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCart(this.cartItems); 
    }
  }

  routerHome() {
    this.router.navigateByUrl('/home');
  }
}
