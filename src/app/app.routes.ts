import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { DetailsProductComponent } from './component/details-product/details-product.component';
import { LoginComponent } from './component/login/login.component';
import{RegisterComponent}from './component/register/register.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { CartComponent } from './component/cart/cart.component';



export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {path:'Category/:category',component:ProductListComponent},
    {path:'Product',component:ProductListComponent},
    {path:'Product/:id',component:DetailsProductComponent},
    {path:'Details/:id',component:DetailsProductComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, 
    { path: 'about', component: AboutUsComponent },
    { path: 'cart', component: CartComponent },
];
