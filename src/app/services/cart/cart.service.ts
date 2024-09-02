import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iproduct } from '../../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Iproduct[] = []; // مصفوفة لتخزين المنتجات
  private cartItemsSubject: BehaviorSubject<Iproduct[]>;
  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor() { 
    this.loadCartFromLocalStorage(); // تحميل العربة من localStorage عند بدء الخدمة
    this.cartItemsSubject = new BehaviorSubject<Iproduct[]>(this.cartItems);
  }

  addToCart(product: Iproduct): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      // If product exists, increase its quantity
      existingProduct.quantity += product.quantity; // or just `+= 1` if you're adding one at a time
    } else {
      // If product does not exist, add it to the cart
      this.cartItems.push(product);
    }
    this.cartItemsSubject.next(this.cartItems);
    this.updateCartCount();
    this.saveCartToLocalStorage(); 
    console.log('Current cart items:', this.cartItems);
  }
    
 

  getCartItems(): Observable<Iproduct[]> {
    return this.cartItemsSubject.asObservable();
  }
  getCartCount(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }
 updateCartCount(): void {
    const totalItems = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    this.cartCountSubject.next(totalItems);
  }


  private saveCartToLocalStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCartFromLocalStorage(): void {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  removeFromCart(index: number): void {
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.cartItemsSubject.next(this.cartItems);
      this.updateCartCount(); 
      this.saveCartToLocalStorage();
      // تحديث localStorage بعد إزالة العنصر
    }
  }
  updateCart(cartItems: Iproduct[]): void {
    this.cartItemsSubject.next(cartItems); 
    localStorage.setItem('cart', JSON.stringify(cartItems)); 
    this.updateCartCount();
    this.saveCartToLocalStorage();// حفظ البيانات إلى Local Storage
  }
  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    localStorage.removeItem('cartItems'); // إزالة العربة من localStorage
  }
}
