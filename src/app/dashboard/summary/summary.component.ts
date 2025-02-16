import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CalendarComponent } from "../calendar/calendar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { BannerComponent } from "../../banner/banner.component";
import { ChatbotComponent } from "../../chatbot/chatbot.component";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CalendarComponent, SidebarComponent, BannerComponent, ChatbotComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {

}
