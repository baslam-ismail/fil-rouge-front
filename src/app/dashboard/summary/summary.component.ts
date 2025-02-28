import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CalendarWidgetComponent } from "../calendar-widget/calendar-widget.component";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CalendarWidgetComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {

}
