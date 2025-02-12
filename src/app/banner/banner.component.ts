import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  standalone: true,
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  // Données du composant
  rendezVous = 6;
  demandesServices = 15;
  demandesOperations = 3;
}
