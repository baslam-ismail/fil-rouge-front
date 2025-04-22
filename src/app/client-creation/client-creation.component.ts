import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ClientService, ClientRequest } from '../core/services/client.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-client-creation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SidebarComponent],
  templateUrl: './client-creation.component.html',
  styleUrls: ['./client-creation.component.css']
})
export class ClientCreationComponent implements OnInit {
  clientForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: [''],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.clientForm.invalid) {
      Object.keys(this.clientForm.controls).forEach(key => {
        const control = this.clientForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.isLoading = true;
    const clientData: ClientRequest = this.clientForm.value;

    this.clientService.createClient(clientData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.successMessage = 'Le compte client a été créé avec succès.';
          this.clientForm.reset();
          setTimeout(() => {
            this.router.navigate(['/client-management']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error creating client:', error);
          if (error.status === 409) {
            this.errorMessage = 'Un client avec cet email ou ce numéro de téléphone existe déjà.';
          } else {
            this.errorMessage = 'Une erreur s\'est produite lors de la création du client. Veuillez réessayer.';
          }
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/client-management']);
  }
}
