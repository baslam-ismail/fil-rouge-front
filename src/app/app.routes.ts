// app.routes.ts
import { Routes } from '@angular/router';
import { BankOperationsComponent } from './bank-operations/bank-operations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpBankAdvisorComponent } from './help-bank-advisor/help-bank-advisor.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CustomerPortfolioComponent } from './customer-portfolio/customer-portfolio.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ProfilComponent } from './profil/profil.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'create-account', component: CreateAccountComponent},
    { path: 'customer-portfolio', component: CustomerPortfolioComponent},
    { path: 'appointments', component: AppointmentsComponent},
    { path: 'bank-operations', component: BankOperationsComponent},
    { path: 'help-bank-advisor', component: HelpBankAdvisorComponent},
    { path: 'profil', component: ProfilComponent},
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'chatbot', component: ChatbotComponent}

];
