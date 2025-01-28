import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar', // Le sélecteur du composant
  standalone: true, // Rend le composant standalone
  imports: [CommonModule], // Modules nécessaires pour ce composant
  templateUrl: './sidebar.component.html', // Lien vers le template
  styleUrls: ['./sidebar.component.css'] // Lien vers les styles
})
export class SidebarComponent { }
