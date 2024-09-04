import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iproduct } from '../../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Iproduct[] = [];
  private orders: Iproduct[] = []; // Array to store cart items
  private cartItemsSubject: BehaviorSubject<Iproduct[]> = new BehaviorSubject<Iproduct[]>(this.cartItems);
  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private cartTotalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private cartLengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.cartItems.length);
  private ordersSubject: BehaviorSubject<Iproduct[]> = new BehaviorSubject<Iproduct[]>([]);
  constructor() { 
    this.loadCartFromLocalStorage(); // Load cart from localStorage on service initialization
    this.updateCartTotal(); // Initialize total cost
  }
  moveCartToOrders(): void {
    if (this.cartItems.length > 0) {
      this.orders.push(...this.cartItems); // Add all cart items to orders
      this.ordersSubject.next(this.orders); // Update the orders observable
      console.log('Orders after moving items:', this.orders); // Log orders after moving
      this.clearCart(); // Clear the cart after moving items
    } else {
      console.log('Cart is empty, no items to move.');
    } 
  }
  // Add product to the cart
  addToCart(product: Iproduct): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      // Increase quantity if product already in cart
      existingProduct.quantity += product.quantity;
    } else {
      // Add new product to cart
      this.cartItems.push(product);
    }
    this.updateCart();
  }

  // Calculate total count of items in the cart
  private calculateTotalCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  // Update total price of items in the cart
  private updateCartTotal(): void {
    const total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.cartTotalSubject.next(total);
  }
  getOrders(): Observable<Iproduct[]> {
    return this.ordersSubject.asObservable();
  }
  // Get cart items as an observable
  getCartItems(): Observable<Iproduct[]> {
    return this.cartItemsSubject.asObservable();
  }

  // Get cart count as an observable
  getCartCount(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }

  // Get cart total price as an observable
  getCartTotal(): Observable<number> {
  
    return this.cartTotalSubject.asObservable();
  }

  // Get cart length as an observable
  getCartLength(): Observable<number> {
    console.log("lenght:", this.cartItems.length)
    return this.cartLengthSubject.asObservable();
    
  }

  // Remove product from cart by index
  removeFromCart(index: number): void {
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.updateCart();
    }
  }

  // Update cart items and save to localStorage
  updateCart(cartItems: Iproduct[] = this.cartItems): void {
    this.cartItems = cartItems;
    this.cartItemsSubject.next(this.cartItems); 
    this.cartCountSubject.next(this.calculateTotalCount());
    this.cartLengthSubject.next(this.cartItems.length);
    this.updateCartTotal();
    this.saveCartToLocalStorage(); 
  // Save cart to localStorage
  }

  // Clear all items from the cart
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
    localStorage.removeItem('cartItems'); // Remove cart from localStorage
  }

  // Save cart items to localStorage
  private saveCartToLocalStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    localStorage.setItem('orders', JSON.stringify(this.orders));
    localStorage.setItem('lenght', JSON.stringify(this.cartItems.length));
  }

  // Load cart items from localStorage
  private loadCartFromLocalStorage(): void {
    const storedCartItems = localStorage.getItem('cartItems');
    const storedOrders = localStorage.getItem('orders');
    const storeLenght=localStorage.getItem('lenght')
    this.orders = storedOrders ? JSON.parse(storedOrders) : [];
    this.ordersSubject.next(this.orders);
    this.cartItems.length=storeLenght?JSON.parse(storeLenght):0;
    this.cartLengthSubject.next(this.cartItems.length)
    if (storedCartItems) {
      try {
        const parsedItems = JSON.parse(storedCartItems);
        this.cartItems = Array.isArray(parsedItems) ? parsedItems : [];
        this.cartItemsSubject.next(this.cartItems);
        this.cartLengthSubject.next(this.cartItems.length);
      } catch (error) {
        console.error('Failed to parse cartItems from localStorage:', error);
        this.cartItems = [];
      }
    }
  }
}
