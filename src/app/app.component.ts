import { Component} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {BannerComponent} from "./banner/banner.component";
import {SummaryComponent} from "./dashboard/summary/summary.component";
import { ChatbotComponent } from "./chatbot/chatbot.component";


@Component({
  selector: 'app-root',
  standalone: true, // Composant standalone
  imports: [
    RouterOutlet,
  /*  SidebarComponent,
    BannerComponent,
    SummaryComponent,*/
  ],
    //ChatbotComponent

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-malsi';

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
  }
 
}
