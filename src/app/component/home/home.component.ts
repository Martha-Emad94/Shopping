import { Component, OnInit } from '@angular/core';

import { Icategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProuctService } from '../../services/Product/api-prouct.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,HeaderComponent],
  providers: [ApiProuctService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [       // metadata array
    trigger('photosAnimation', [
      state('true', style({ backgroundColor: 'green' })),
      state('false', style({ backgroundColor: 'red' })),
      transition('true => false', animate('1000ms linear')),
      transition('false => true', animate('1000ms linear'))
    ])
  
]
})
export class HomeComponent implements OnInit {
  categories: Icategory[] = [];
  
  // Mapping categories to image URLs
  getImageForCategory(name: string):string {
    const categoryImages: { [key: string]: string } = {
      "electronics": "./assets/images/smartphone.png",
      "jewelery": "./assets/images/jewelery.png",
      "men's clothing": "./assets/images/menclothing.png",
      "women's clothing": "./assets/images/womenclothing.png",
      // Add more categories as needed
    };
    return categoryImages[name]
    // صورة افتراضية إذا لم يكن هناك تطابق
  }

  constructor(private productService: ApiProuctService,private router:Router,private rout:ActivatedRoute) {}

  ngOnInit(): void {
    this.productService.getAllCategory().subscribe({
      next: (res :any[] ) => {  // تأكد من أن res هو مصفوفة من النصوص
       // تحقق من شكل استجابة الـ API

        // تحويل كل اسم فئة إلى كائن يحتوي على name و url
        this.categories = res.map((cat ,index) => {
        
        
          return {
            id:index+1,
            
            name: cat, // تأكد من أن name هي سلسلة نصية
            url: this.getImageForCategory(cat) // تمرير name بشكل صحيح
          } as unknown as Icategory;  // تحويل الكائن إلى النوع Icategory
        });

      
      },
      error: (err) => console.error('Error fetching categories', err)
    });
    
  }
  
  trackByCategory(index: number, category: Icategory): string {
    return category.name;  // استخدام الاسم كمفتاح فريد
  }
  Rouetproducts(category: string){
    this.router.navigateByUrl(`Category/${category}`); 
     }
     routerAllProducts(){
      this.router.navigateByUrl("/Product");
    }
}
