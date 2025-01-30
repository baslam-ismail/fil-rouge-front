import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    SidebarComponent,
    BannerComponent 
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {

}
