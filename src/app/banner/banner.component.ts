import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  // Données du composant
  rendezVous = 6;
  demandesServices = 15;
  demandesOperations = 3;
}
