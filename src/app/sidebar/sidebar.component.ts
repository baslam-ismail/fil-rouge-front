import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  ngOnInit(): void {
    // Vérifier si window est disponible (pour le rendu côté serveur)
    if (typeof window !== 'undefined') {
      // Surveiller les changements de thème pour mettre à jour l'UI si nécessaire
      window.addEventListener('storage', (event) => {
        if (event.key === 'theme') {
          // Le thème a changé, vous pouvez effectuer des actions supplémentaires ici si nécessaire
          console.log('Thème changé:', event.newValue);
        }
      });
    }
  }

  logout() {
    // Implémentation de la déconnexion
    console.log('Déconnexion');
    // Vous pouvez ajouter ici la logique de déconnexion
  }
}
