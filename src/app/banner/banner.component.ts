import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true, // Rendre le composant standalone
  imports: [CommonModule], // Import des dépendances nécessaires
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent { 
  // Données du composant
  rendezVous = 6;
  demandesServices = 15;
  demandesOperations = 3;
}
