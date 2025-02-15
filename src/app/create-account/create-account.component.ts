import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from '../banner/banner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    SidebarComponent,
    BannerComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent {
  constructor(private router: Router) {}

  onSubmit(form: any) {
    // Logique de soumission du formulaire ici
    console.log('Form submitted', form);

    // Redirection vers la page "customer portfolio"
    this.router.navigate(['/customer-portfolio']);
  }
}
