import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { BannerComponent } from "../banner/banner.component";

@Component({
  selector: 'app-list-advisors',
  standalone: true,
  imports: [CommonModule, SidebarComponent, BannerComponent],
  templateUrl: './list-advisors.component.html',
  styleUrls: ['./list-advisors.component.css']
})
export class ListAdvisorsComponent implements OnInit {
  advisors: any[] = []; // Liste des conseillers

  ngOnInit(): void {
    this.loadAdvisors();
  }

  // Charger les conseillers depuis localStorage
  loadAdvisors() {
    const storedAdvisors = localStorage.getItem('advisors');
    this.advisors = storedAdvisors ? JSON.parse(storedAdvisors) : [];
  }
}
