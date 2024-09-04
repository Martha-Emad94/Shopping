import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Iproduct } from '../../models/iproduct';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  providers:[CartService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders: Iproduct[] = [];

  constructor(private router:Router,private cartService: CartService){}
  ngOnInit(): void {
    this.cartService.getOrders().subscribe({
      next:(res)=>{
        this.orders=res;
        console.log(this.orders)
        
      },
      error:(error)=>{
        console.log(error)
      }
 
  })

}
getCartTotal(): string {
  const total = this.orders.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
getCountItems(): number {
  return this.orders.reduce((acc, item) => acc + item.quantity, 0); // Direct calculation of total items
}

  routerHome(){
    this.router.navigateByUrl(`/home`);
  }
}
