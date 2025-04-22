import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-help-bank-advisor',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    BannerComponent
  ],
  templateUrl: './help-bank-advisor.component.html',
  styleUrls: ['./help-bank-advisor.component.css']
})
export class HelpBankAdvisorComponent {
  faqs = [
    {
      question: 'Comment créer un nouveau compte client ?',
      answer: 'Pour créer un nouveau compte client, accédez à la section "Création de compte" dans le menu latéral. Remplissez le formulaire avec les informations du client et cliquez sur "Créer compte".'
    },
    {
      question: 'Comment programmer un rendez-vous avec un client ?',
      answer: 'Pour programmer un rendez-vous, allez dans la section "Rendez-vous", puis cliquez sur "Nouveau rendez-vous". Sélectionnez un client, une date, une heure et ajoutez une description.'
    },
    {
      question: 'Comment traiter une demande de service ?',
      answer: 'Accédez à la section "Demandes de services", trouvez la demande concernée et cliquez sur l\'icône d\'édition. Mettez à jour le statut et ajoutez une réponse ou des commentaires.'
    },
    {
      question: 'Comment enregistrer une opération quotidienne ?',
      answer: 'Dans la section "Opérations quotidiennes", cliquez sur le bouton "Nouvelle opération". Sélectionnez le type d\'opération, entrez les détails nécessaires et validez.'
    },
    {
      question: 'Comment consulter le portefeuille d\'un client ?',
      answer: 'Allez dans "Portefeuille Client", puis recherchez le client par son nom ou utilisez les filtres. Cliquez sur un client pour voir tous ses détails.'
    },
    {
      question: 'Comment mettre à jour mes informations de profil ?',
      answer: 'Cliquez sur votre nom en bas de la barre latérale, puis sélectionnez "Profil". Vous pourrez modifier vos informations personnelles et professionnelles.'
    }
  ];

  resources = [
    {
      title: 'Guide des procédures bancaires',
      description: 'Manuel complet des processus et procédures à suivre pour les opérations bancaires quotidiennes.',
      link: '/assets/docs/guide_procedures.pdf'
    },
    {
      title: 'Tutoriels vidéo',
      description: 'Collection de vidéos explicatives sur l\'utilisation du système MALSI.',
      link: 'https://formation.malsi.com/videos'
    },
    {
      title: 'Base de connaissances',
      description: 'Articles détaillés sur divers sujets liés à la banque et aux services financiers.',
      link: 'https://kb.malsi.com'
    },
    {
      title: 'Formation en ligne',
      description: 'Cours interactifs pour améliorer vos compétences en tant que conseiller bancaire.',
      link: 'https://learning.malsi.com'
    }
  ];

  contactSupport() {
    // Fonction pour contacter le support
    alert('Le support technique sera contacté. Un agent vous contactera bientôt.');
  }
}