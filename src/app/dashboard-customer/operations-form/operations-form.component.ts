import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // ✅ Import pour éviter l'erreur `ngModel`
import { SidebarComponent } from '../../sidebar/sidebar.component';  // ✅ Vérifie ce chemin
import { BannerComponent } from '../../banner/banner.component';  // ✅ Vérifie ce chemin

@Component({
  selector: 'app-operations-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ✅ Correction de l'erreur `ngModel`
    SidebarComponent,
    BannerComponent
  ],
  templateUrl: './operations-form.component.html',
  styleUrls: ['./operations-form.component.css']
})
export class OperationsFormComponent {
  operationData = {
    type: '',
    description: '',
    urgency: 'moyenne'
  };

  submitRequest() {
    console.log("Demande envoyée :", this.operationData);
    alert("Votre demande d'opération quotidienne a bien été envoyée !");
    
    // ✅ Réinitialisation du formulaire après soumission
    this.operationData = { type: '', description: '', urgency: 'moyenne' };
  }
}
