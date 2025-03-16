import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';  
import { SidebarComponent } from '../../sidebar/sidebar.component';  
import { BannerComponent } from '../../banner/banner.component';  

@Component({
  selector: 'app-operations-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    SidebarComponent,
    BannerComponent
  ],
  templateUrl: './operations-form.component.html',
  styleUrls: ['./operations-form.component.css']
})
export class OperationsFormComponent {
  operationsForm = this.fb.group({
    accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    type: ['', Validators.required],
    title: ['', [Validators.required, Validators.minLength(7)]],
    description: ['', [Validators.required, Validators.maxLength(250)]]
  });

  constructor(private fb: FormBuilder) {}

  submitRequest() {
    if (this.operationsForm.valid) {
      console.log("Demande envoyée :", this.operationsForm.value);
      alert("Votre demande d'opération quotidienne a bien été envoyée !");
      this.operationsForm.reset();
    } else {
      alert("Veuillez remplir correctement le formulaire.");
    }
  }
}
