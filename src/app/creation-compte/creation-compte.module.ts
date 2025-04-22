import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CreationCompteComponent } from './creation-compte.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { ThemeToggleModule } from '../theme-toggle/theme-toggle.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SidebarModule,
    ThemeToggleModule
  ],
  exports: []
})
export class CreationCompteModule { }
