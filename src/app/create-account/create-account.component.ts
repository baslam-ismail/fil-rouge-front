import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from '../banner/banner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    SidebarComponent,
    BannerComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  // Ajouter la logique pour soumettre le formulaire
}
