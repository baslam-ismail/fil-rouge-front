import { Routes } from '@angular/router';
import { BankOperationsComponent } from './bank-operations/bank-operations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpBankAdvisorComponent } from './help-bank-advisor/help-bank-advisor.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CustomerPortfolioComponent } from './customer-portfolio/customer-portfolio.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ProfilComponent } from './profil/profil.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { DashboardCustomerComponent } from './dashboard-customer/dashboard-customer.component';
import { OperationsFormComponent } from './dashboard-customer/operations-form/operations-form.component'; // ✅ Chemin corrigé
import { RequestsFormComponent } from './dashboard-customer/requests-form/requests-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirection par défaut
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard-customer', component: DashboardCustomerComponent },
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'customer-portfolio', component: CustomerPortfolioComponent },
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'bank-operations', component: BankOperationsComponent },
    { path: 'help-bank-advisor', component: HelpBankAdvisorComponent },
    { path: 'profil', component: ProfilComponent },
    { path: 'chatbot', component: ChatbotComponent },
    { path: 'operations-form', component: OperationsFormComponent },
    { path: 'requests-form', component: RequestsFormComponent }, // ✅ Route corrigée
    { path: '**', redirectTo: 'dashboard' } // Gestion des erreurs de routes
];
