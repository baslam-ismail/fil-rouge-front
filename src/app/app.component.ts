import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CalendarComponent } from './dashboard/calendar/calendar.component'; 
import { SummaryComponent } from './dashboard/summary/summary.component'; 


@Component({
  selector: 'app-root',
  standalone: true, // Composant standalone
  imports: [
    RouterOutlet,
    SidebarComponent,
    BannerComponent,
    CalendarComponent, // Ajout du composant calendrier
    SummaryComponent, // Ajout du composant résumé
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-malsi';
}
