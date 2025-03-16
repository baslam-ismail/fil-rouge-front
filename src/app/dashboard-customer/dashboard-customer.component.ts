import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BannerComponent } from '../banner/banner.component';  

@Component({
  selector: 'app-dashboard-customer',
  standalone: true,
  imports: [SidebarComponent, BannerComponent],
  templateUrl: './dashboard-customer.component.html',
  styleUrl: './dashboard-customer.component.css'
})
export class DashboardCustomerComponent {

}
