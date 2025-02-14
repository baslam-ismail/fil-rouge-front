import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-customer',
  standalone: true,
  imports: [SidebarComponent,],
  templateUrl: './dashboard-customer.component.html',
  styleUrl: './dashboard-customer.component.css'
})
export class DashboardCustomerComponent {

}
