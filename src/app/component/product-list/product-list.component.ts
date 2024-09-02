import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Iproduct } from '../../models/iproduct';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProuctService } from '../../services/Product/api-prouct.service';
import { SearchService } from '../../services/search/search.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],

providers: [ApiProuctService],
templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit ,OnChanges{
  products:Iproduct[]=[];
  Currentproduct:string | null = null;
 loading:boolean=false;
 @Input() searchTerm: string = '';
 filteredProducts: Iproduct[] = [];
  constructor(private productService: ApiProuctService ,private router:Router,private route:ActivatedRoute,
    private search:SearchService
  ){}
  ngOnChanges(): void {
     // تصفية المنتجات عند تغيير نص البحث
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.Currentproduct = params.get('category');
      this.loading=true;
      if (this.Currentproduct) {
        this.productService.getProductsByCatName(this.Currentproduct).subscribe({
          next: (res) => {
            
              this.products = res;
              this.filteredProducts = res;
              this.loading = false; // توقف التحميل عند اكتمال البيانات
           
          },
          error: (error) => {
            console.log('Error fetching products by category', error);
            this.loading=false;
          }
        });
      } else {
        this.productService.getAllProducts().subscribe({
          next: (res) => {
          
              this.products = res;
              this.filteredProducts = res;
              this.loading = false; // توقف التحميل عند اكتمال البيانات
            
          },
          error: (error) => {
            console.log('Error fetching products', error);
            this.loading=false;
          }
        });
      }
    });
    this.search.search$.subscribe(term => {
      this.filterProducts(term);
    });
  }
 
  filterProducts(search: string): void {
    if (!search) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  routerDetails(id:number){
    this.router.navigateByUrl(`Product/${id}`)
  }
}
