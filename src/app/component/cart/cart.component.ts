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
  cartTotal:number=0;
  lenght:number=0;
  showMessage: boolean=false;
  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.updateCartSummary();
    });

    this.cartService.getCartTotal().subscribe(total => {
      this.totalPrice = total;
    });
  }

  updateCartSummary(): void {
    this.countItems();
  }

  countItems(): void {
    this.totalItems = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  getCountItems(): number {
    return this.totalItems;
  }
onBuy():void{
  console.log('Cart items before purchase:', this.cartItems); // Log cart items
  if (this.cartItems.length > 0) {
    this.cartService.moveCartToOrders();
    this.showSuccessMessage()
 
  } else {
    alert('Your cart is empty!');
  }
}
showSuccessMessage() {
  this.showMessage = true;
  setTimeout(() => {
    this.showMessage = false;
  }, 3000); // أخفي الرسالة بعد 3 ثوانٍ
}
  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.updateCartSummary();
  }

  increaseQuantity(item: Iproduct): void {
    item.quantity++;
    this.cartService.updateCart(this.cartItems);
    this.updateCartSummary();
  }

  decreaseQuantity(item: Iproduct): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCart(this.cartItems);
      this.updateCartSummary();
    }
  }

  routerHome(): void {
    this.router.navigateByUrl('/home');
  }
}