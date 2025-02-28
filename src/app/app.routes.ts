// app.routes.ts
import {RouterModule, Routes} from '@angular/router';
import { BankOperationsComponent } from './bank-operations/bank-operations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpBankAdvisorComponent } from './help-bank-advisor/help-bank-advisor.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CustomerPortfolioComponent } from './customer-portfolio/customer-portfolio.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ProfilComponent } from './profil/profil.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import {ServiceRequestComponent} from "./service-request/service-request.component";
import {DailyOperationsComponent} from "./daily-operations/daily-operations.component";
import {NgModule} from "@angular/core";
import { CalendarWidgetComponent } from './dashboard/calendar-widget/calendar-widget.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentsFormComponent } from './appointments/appointments-form/appointments-form.component';
import { LoginComponent } from './login/login.component';
import { CreateAdvisorComponent } from './create-advisor/create-advisor.component';
import { ListAdvisorsComponent } from './list-advisors/list-advisors.component';
import { ClientManagementComponent } from './client-management/client-management.component';

import { DashboardCustomerComponent } from './dashboard-customer/dashboard-customer.component';
import { OperationsFormComponent } from './dashboard-customer/operations-form/operations-form.component';
import { RequestsFormComponent } from './dashboard-customer/requests-form/requests-form.component';


export const routes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'calendar-widget', component: CalendarWidgetComponent},
    { path: 'calendar', component: CalendarComponent},
    { path: 'appointments-form', component: AppointmentsFormComponent},
    { path: 'create-account', component: CreateAccountComponent},
    { path: 'customer-portfolio', component: CustomerPortfolioComponent},
    { path: 'appointments', component: AppointmentsComponent},
    { path: 'bank-operations', component: DailyOperationsComponent},
    { path: 'help-bank-advisor', component: HelpBankAdvisorComponent},
    { path: 'profil', component: ProfilComponent},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard-customer', component: DashboardCustomerComponent },
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'chatbot', component: ChatbotComponent},
    { path: 'service-requests', component: ServiceRequestComponent },
    { path: 'customer-portfolio', component: CustomerPortfolioComponent },
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'bank-operations', component: BankOperationsComponent },
    { path: 'help-bank-advisor', component: HelpBankAdvisorComponent },
    { path: 'chatbot', component: ChatbotComponent },
    { path: 'operations-form', component: OperationsFormComponent },
    { path: 'requests-form', component: RequestsFormComponent },
    { path: 'requests-form', component: RequestsFormComponent },
    { path: 'chatbot', component: ChatbotComponent},
    {path : 'login', component: LoginComponent},
    { path: 'create-advisor', component: CreateAdvisorComponent },
    { path: 'list-advisors', component: ListAdvisorsComponent },
    { path: 'client-management', component:ClientManagementComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
