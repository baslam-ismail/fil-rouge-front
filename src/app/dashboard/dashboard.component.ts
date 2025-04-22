import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SummaryComponent } from './summary/summary.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    BannerComponent,
    SummaryComponent,
    ChatbotComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
