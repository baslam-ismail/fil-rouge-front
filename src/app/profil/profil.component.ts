import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BannerComponent } from '../banner/banner.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ReactiveFormsModule, BannerComponent, ChatbotComponent, ReactiveFormsModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmitProfile() {
    if (this.profileForm.valid) {
      console.log('Profil mis à jour !', this.profileForm.value);
      // Ajoutez ici la logique pour mettre à jour le profil
    } else {
      alert('Veuillez remplir correctement les champs du profil.');
    }
  }

  onSubmitPassword() {
    if (this.passwordForm.valid) {
      console.log('Mot de passe mis à jour !', this.passwordForm.value);
      // Ajoutez ici la logique pour mettre à jour le mot de passe
    } else {
      alert('Veuillez remplir correctement les champs du mot de passe.');
    }
  }
}