import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-customer-portfolio',
  standalone: true,
  imports: [
    SidebarComponent,
    BannerComponent 
  ],
  templateUrl: './customer-portfolio.component.html',
  styleUrl: './customer-portfolio.component.css'
})
export class CustomerPortfolioComponent {

}
