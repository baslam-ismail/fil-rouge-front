import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CalendarComponent } from "../calendar/calendar.component";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CalendarComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {

}
