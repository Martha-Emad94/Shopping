import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './component/login/login.component';
import { ApiAuthService } from './services/Auth/api-auth.service';
import { ButtonComponent } from './shared/button/buttons/button.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,HeaderComponent,FooterComponent,ButtonComponent,HomeComponent,FormsModule,CommonModule,HttpClientModule],  
providers:[ApiAuthService],
templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Home-store';
  show:boolean=true;
  userName: string | null = null;
  isAuthenticated: boolean = false;
  search:string="";
  constructor(private router:Router,private auth:ApiAuthService){
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
      
        if(val.url =='/'|| val.url=='/login' || val.url=='/register'){
          this.show=false
        }else{
          this.show=true;
        }
        
      }
    })
  }
  }

