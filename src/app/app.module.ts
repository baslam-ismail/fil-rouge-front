import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilComponent } from './profil/profil.component';

bootstrapApplication(AppComponent);

@NgModule({
  declarations: [],
  imports: [
    BrowserModule
  ],
  providers: [],
})

export class AppModule { }
