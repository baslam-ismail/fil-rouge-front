import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BannerComponent } from './banner/banner.component';
import { CalendarComponent } from './dashboard/calendar/calendar.component'; // Import du composant Calendar
import { SummaryComponent } from './dashboard/summary/summary.component'; // Import du composant Summary

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    BannerComponent,
    CalendarComponent, // Ajoute le composant Calendar
    SummaryComponent // Ajoute le composant Summary
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
