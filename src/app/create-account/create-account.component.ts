import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    SidebarComponent,
    BannerComponent 
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

}
