import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { BannerComponent } from "../banner/banner.component";

@Component({
  selector: 'app-create-advisor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent, BannerComponent],
  templateUrl: './create-advisor.component.html',
  styleUrls: ['./create-advisor.component.css']
})
export class CreateAdvisorComponent implements OnInit {
  advisors: any[] = []; // Liste des conseillers
  
  advisorForm = this.fb.group({
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  

  constructor(private router: Router, private fb: FormBuilder) {}

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
    if (this.advisorForm.valid) {
      const newAdvisor = { ...this.advisorForm.value };

      this.advisors.push(newAdvisor);
      localStorage.setItem('advisors', JSON.stringify(this.advisors));

      alert('Conseiller ajouté avec succès !');

      this.advisorForm.reset();

      this.router.navigate(['/list-advisors']);
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }
}
