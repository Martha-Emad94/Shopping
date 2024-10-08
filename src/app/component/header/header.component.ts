import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { ApiAuthService } from '../../services/Auth/api-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { CaptialPipe } from '../../shared/button/pipe/captial.pipe';
import { ApiProuctService } from '../../services/Product/api-prouct.service';
import { SearchService } from '../../services/search/search.service';
import { CartService } from '../../services/cart/cart.service';
import { Iproduct } from '../../models/iproduct';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, CaptialPipe, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatToolbarModule, HttpClientModule, FooterComponent],
  providers: [ApiAuthService, ApiProuctService,CartService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userName: string | null = null;
  @Input() isAuthenticated: boolean = false;
  showMenu: boolean = false;
  searchControl = new FormControl(''); // Reactive form control for the search input
  cartItems: Iproduct[] = [];
  cartCount:number=0;
  constructor(private auth: ApiAuthService, private router: Router, private changeDetector: ChangeDetectorRef,
     private apiproduct: ApiProuctService,private searchService: SearchService,private cartService: CartService) {}

  ngOnInit(): void {
    this.auth.getUserName().subscribe(name => {
      this.userName = name;
      console.log(this.userName);
    });
    this.auth.isAuthenticatedStatus().subscribe(isLoggedIn => {
      this.isAuthenticated = isLoggedIn;
    });

    // Emit search term when value changes
    this.searchControl.valueChanges.subscribe(term => {
      this.searchService.setSearchTerm(term ?? '');
    });

    this.cartService.getCartLength().subscribe(count => {
      this.cartCount = count;
      console.log('Cart count updated:', this.cartCount);
    });
  }
 
  toggleMenu(): void {
    this.showMenu = !this.showMenu; // Toggles the menu visibility
  }

  onLogout(): void {
    this.auth.logout(); // Call logout function from the service
  // Close the menu after logout
  }

  routerHome() {
    this.router.navigateByUrl('/home');
  }

  routerAllProducts() {
    this.router.navigateByUrl("/Product");
  }

  routerLogin() {
    this.router.navigateByUrl('/login');
  }
  routerAboutUs(){
    this.router.navigateByUrl('/about');
  }
  routerCart() {
    this.router.navigateByUrl('/cart');
  }
  routerAllOrders(){
    this.router.navigateByUrl('/order');
  }
  
}
