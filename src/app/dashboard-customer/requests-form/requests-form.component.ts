import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Gestion de `ngModel`
import { SidebarComponent } from '../../sidebar/sidebar.component'; // ✅ Correction du chemin
import { BannerComponent } from '../../banner/banner.component'; // ✅ Correction du chemin
import { title } from 'node:process';

@Component({
  selector: 'app-requests-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ✅ Permet l'utilisation de `ngModel`
    SidebarComponent,
    BannerComponent
  ],
  templateUrl: './requests-form.component.html',
  styleUrls: ['./requests-form.component.css']
})
export class RequestsFormComponent {
  requestData = {
    accountNumber: '',
    subject: '',
    title: '',
    description: ''
  };

  submitRequest() {
    console.log("Demande envoyée :", this.requestData);
    alert("Votre demande de service a bien été envoyée !");
    this.requestData = { accountNumber: '', subject: '', title:'', description: '' };
  }
}
