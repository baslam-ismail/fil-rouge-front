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
import { CalendarComponent } from './dashboard/calendar/calendar.component';
import { CalendarFormComponent } from './dashboard/calendar/calendar-form/calendar-form.component';
import { DashboardCustomerComponent } from './dashboard-customer/dashboard-customer.component';
import { OperationsFormComponent } from './dashboard-customer/operations-form/operations-form.component'; 
import { RequestsFormComponent } from './dashboard-customer/requests-form/requests-form.component';


export const routes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'calendar', component: CalendarComponent},
    { path: 'calendar-form', component: CalendarFormComponent}, 
    { path: 'create-account', component: CreateAccountComponent},
    { path: 'customer-portfolio', component: CustomerPortfolioComponent},
    { path: 'appointments', component: AppointmentsComponent},
    { path: 'bank-operations', component: BankOperationsComponent},
    { path: 'help-bank-advisor', component: HelpBankAdvisorComponent},
    { path: 'profil', component: ProfilComponent},
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
    { path: 'requests-form', component: RequestsFormComponent }, 
];
