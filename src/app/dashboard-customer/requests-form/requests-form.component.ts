import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { SidebarComponent } from '../../sidebar/sidebar.component'; 
import { BannerComponent } from '../../banner/banner.component';


@Component({
  selector: 'app-requests-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    SidebarComponent,
    BannerComponent
  ],
  templateUrl: './requests-form.component.html',
  styleUrls: ['./requests-form.component.css']
})
export class RequestsFormComponent {
  requestsForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    title: ['', [Validators.required, Validators.minLength(7)]],
    description: ['', [Validators.required, Validators.maxLength(250)]]
  });

  constructor(private fb: FormBuilder) {}

  submitRequest() {
    if (this.requestsForm.valid) {
      console.log("Demande envoyée :", this.requestsForm.value);
      alert("Votre demande de service a bien été envoyée !");
      this.requestsForm.reset();
    } else {
      alert("Veuillez remplir correctement le formulaire.");
    }
  }
}
