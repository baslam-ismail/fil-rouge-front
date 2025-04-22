import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreationCompteService } from '../creation-compte/creation-compte.service';
import { BannerComponent } from '../banner/banner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BannerComponent,
    SidebarComponent
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  accountForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private creationService: CreationCompteService,
    private router: Router
  ) {
    this.accountForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['']
    });
  }

  ngOnInit(): void {
    // Formulaire déjà initialisé dans le constructeur
  }

  get f() { return this.accountForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.accountForm.invalid) {
      return;
    }

    this.loading = true;

    this.creationService.createClient(this.accountForm.value)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Compte client créé avec succès!';
          this.accountForm.reset();
          this.submitted = false;

          // Redirection vers la page de portefeuille client après 2 secondes
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
  }

  resetForm() {
    this.accountForm.reset();
    this.submitted = false;
    this.errorMessage = '';
    this.successMessage = '';
  }
}
