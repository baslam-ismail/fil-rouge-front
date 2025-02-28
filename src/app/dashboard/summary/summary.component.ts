import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CalendarWidgetComponent } from "../calendar-widget/calendar-widget.component";

@Component({
  selector: 'app-summary',
  standalone: true,
<<<<<<< HEAD
  imports: [CalendarComponent,RouterLink, RouterLinkActive],
=======
  imports: [RouterLink, RouterLinkActive, CalendarWidgetComponent],
>>>>>>> 2bd853dc080c33d40ab4b2ed35b93adcd1ac853e
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {

}
