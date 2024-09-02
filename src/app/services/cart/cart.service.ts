import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSource = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSource.asObservable();
  constructor() { }
  addToCart(product: any) {
    const currentItems = this.cartItemsSource.value;
    this.cartItemsSource.next([...currentItems, product]);
  }
}
