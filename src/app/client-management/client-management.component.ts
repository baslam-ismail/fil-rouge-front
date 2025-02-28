import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { BannerComponent } from "../banner/banner.component";

// Interface pour les clients
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  assignedAdvisor: string;
}

// Interface pour les conseillers
interface Advisor {
  id: string;
  name: string;
  clients: Client[];
}

// Interface pour les tâches clients
interface Task {
  nom: string;
  prenom: string;
  typeDemande: string;
  categorie: string;
  conseiller: string;
  categoriesDisponibles: string[];
}

@Component({
  selector: 'app-client-management',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, BannerComponent],
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit {
  clients: Client[] = [
    { id: 1, name: 'Jean Dupont', email: 'jean@example.com', phone: '0612345678', assignedAdvisor: '' },
    { id: 2, name: 'Sophie Martin', email: 'sophie@example.com', phone: '0698765432', assignedAdvisor: '' }
  ];

  advisors: Advisor[] = [
    { id: '1', name: 'Alain Frenault', clients: [] },
    { id: '2', name: 'Sofia Arlouche', clients: [] },
    { id: '3', name: 'Mamadou Toure', clients: [] }
  ];

  clientTasks: Task[] = [
    { nom: 'Dupont', prenom: 'Jean', typeDemande: '', categorie: '', conseiller: '', categoriesDisponibles: [] },
    { nom: 'Martin', prenom: 'Sophie', typeDemande: '', categorie: '', conseiller: '', categoriesDisponibles: [] }
  ];

  categoriesServices = ['Compte Epargne', 'Prêt', 'Assurance'];
  categoriesOperations = ['Prélèvement', 'Virement', 'Carte Bleue'];

  constructor() {}

  ngOnInit(): void {}

  assignClient(client: Client) {
    if (client.assignedAdvisor) {
      let advisor = this.advisors.find(a => a.id === client.assignedAdvisor);
      if (advisor) {
        advisor.clients.push(client);
        alert(`Client ${client.name} attribué à ${advisor.name}`);
      }
    } else {
      alert('Veuillez sélectionner un conseiller.');
    }
  }

  assignTask(clientTasks: Task) {
    if (clientTasks.conseiller) {
      let advisor = this.advisors.find(a => a.id === clientTasks.conseiller);
      if (advisor) {
        let client = this.clients.find(c => c.name.split(' ')[1] === clientTasks.nom && c.name.split(' ')[0] === clientTasks.prenom);
        if (client) {
          advisor.clients.push(client);
          alert(`Client ${clientTasks.nom} attribué à ${advisor.name}`);
        } else {
          alert('Client non trouvé.');
        }
      }
    } else {
      alert('Veuillez sélectionner un conseiller.');
    }
  }

  updateCategories(task: Task) {
    if (task.typeDemande === 'Service') {
      task.categoriesDisponibles = [...this.categoriesServices];
      task.categorie = '';
    } else if (task.typeDemande === 'Opération Bancaire') {
      task.categoriesDisponibles = [...this.categoriesOperations];
      task.categorie = '';
    } else {
      task.categoriesDisponibles = [];
      task.categorie = '';
    }
  }
}
