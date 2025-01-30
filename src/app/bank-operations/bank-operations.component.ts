import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-bank-operations',
  standalone: true,
  imports: [
     SidebarComponent,
    BannerComponent 
  ],
  templateUrl: './bank-operations.component.html',
  styleUrl: './bank-operations.component.css'
})
export class BankOperationsComponent {
  
}
