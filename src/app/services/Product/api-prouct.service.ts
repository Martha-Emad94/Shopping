import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Iproduct } from '../../models/iproduct';
import { Icategory } from '../../models/icategory';



@Injectable({
  providedIn: 'root'
})
export class ApiProuctService {

  constructor(private httpclient:HttpClient) {
  }

   getAllProducts(): Observable<Iproduct[]> {
    return this.httpclient.get<Iproduct[]>('https://fakestoreapi.com/products').pipe(
      map(products => 
        products.map((product ,quantity) => ({
          ...product,
          quantity:quantity+3
        }))
      )
    );
  }

   getAllCategory():Observable<Icategory[]>{
     return this.httpclient.get<Icategory[]>("https://fakestoreapi.com/products/categories")
   }
   getProductsByCatName(categoryName: string): Observable<Iproduct[]> {
    return this.httpclient.get<Iproduct[]>(`https://fakestoreapi.com/products/category/${categoryName}`).pipe(
      map(products => 
        products.map(product => ({
          ...product,
          quantity:3 // Setting a default quantity for each product
        }))
      )
    );
  }
  getProductId(id:number):Observable<Iproduct |undefined>
  {
    return this.httpclient.get<Iproduct>(`https://fakestoreapi.com/products/${id}`)
  }
 
}
