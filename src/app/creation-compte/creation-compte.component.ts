import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { CreationCompteService } from './creation-compte.service';
import { Subscription } from 'rxjs';
import { StatsBannerComponent } from '../shared/stats-banner/stats-banner.component';

@Component({
  selector: 'app-creation-compte',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BannerComponent,
    SidebarComponent,
    ThemeToggleComponent,
    StatsBannerComponent
  ],
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.css']
})
export class CreationCompteComponent implements OnInit, OnDestroy {
  clientForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  successMessage = '';

  // Données pour la bannière de stats
  statsBanner = [
    {
      icon: 'briefcase' as 'briefcase',
      color: 'purple' as 'purple',
      label: 'Comptes créés',
      value: 24
    },
    {
      icon: 'clipboard' as 'clipboard',
      color: 'teal' as 'teal',
      label: 'Demandes en cours',
      value: 15
    },
    {
      icon: 'file' as 'file',
      color: 'red' as 'red',
      label: 'Documents manquants',
      value: 3
    }
  ];

  // Pour les abonnements (cleanup)
  private subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private creationService: CreationCompteService,
    private router: Router
  ) {
    this.clientForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: [''],
      type: ['', [Validators.required]],
      priorite: ['Moyenne']
    });
  }

  ngOnInit(): void {
    // Assurez-vous que le thème est correctement appliqué
    this.applyTheme();
  }

  ngOnDestroy(): void {
    // Nettoyage des abonnements
    this.subscriptions.unsubscribe();
  }

  private applyTheme(): void {
    // Vérifier si window est disponible (pour le rendu côté serveur)
    if (typeof window !== 'undefined') {
      // Vérifier le thème actuel et l'appliquer
      const savedTheme = localStorage?.getItem('theme');
      if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  }

  get f() { return this.clientForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.clientForm.invalid) {
      return;
    }

    this.loading = true;

    const subscription = this.creationService.createClient(this.clientForm.value)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Compte client créé avec succès!';
          this.clientForm.reset();
          this.submitted = false;
          this.clientForm.patchValue({
            priorite: 'Moyenne'
          });

          setTimeout(() => {
            this.router.navigate(['/customer-portfolio']);
          }, 2000);
        },
        error: (error) => {
          this.loading = false;
          if (error.status === 409) {
            this.errorMessage = 'Un client avec cet email ou ce numéro de téléphone existe déjà.';
          } else {
            this.errorMessage = 'Une erreur est survenue lors de la création du compte. Veuillez réessayer.';
          }
          console.error('Erreur lors de la création du compte:', error);
        }
      });

    this.subscriptions.add(subscription);
  }

  resetForm() {
    this.clientForm.reset();
    this.clientForm.patchValue({
      priorite: 'Moyenne'
    });
    this.submitted = false;
    this.errorMessage = '';
    this.successMessage = '';
  }
}
