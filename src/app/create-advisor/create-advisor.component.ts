import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { BannerComponent } from "../banner/banner.component";

@Component({
  selector: 'app-create-advisor',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, BannerComponent],
  templateUrl: './create-advisor.component.html',
  styleUrls: ['./create-advisor.component.css']
})
export class CreateAdvisorComponent implements OnInit {
  advisors: any[] = []; // Liste des conseillers
  
  advisorData = {
    lastname: '',
    firstname: '',
    phone: '',
    email: '',
    role: 'conseiller' // Toujours conseiller
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadAdvisors();
  }

  // Charger les conseillers depuis localStorage
  loadAdvisors() {
    const storedAdvisors = localStorage.getItem('advisors');
    this.advisors = storedAdvisors ? JSON.parse(storedAdvisors) : [];
  }

  // Soumettre le formulaire
  onSubmit() {
    if (this.advisorData.lastname && this.advisorData.firstname && this.advisorData.phone && this.advisorData.email) {
      this.advisors.push({ ...this.advisorData });
      localStorage.setItem('advisors', JSON.stringify(this.advisors));

      alert('Conseiller ajouté avec succès !');

      // Réinitialiser le formulaire
      this.advisorData = {
        lastname: '',
        firstname: '',
        phone: '',
        email: '',
        role: 'conseiller'
      };

      this.router.navigate(['/list-advisors']); // Redirection vers la liste des conseillers
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }
}
