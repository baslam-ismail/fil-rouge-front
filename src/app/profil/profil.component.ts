import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BannerComponent } from '../banner/banner.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-profil',
  standalone: true, // ✅ Rend le composant standalone
  imports: [CommonModule, SidebarComponent, BannerComponent, ChatbotComponent], // ✅ Ajoute les imports
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {}
