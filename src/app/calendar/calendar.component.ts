import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, 
           FullCalendarModule,
           SidebarComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public selectedDate!: Date;
  
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
    ],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today',
    },
    initialView: 'dayGridMonth',
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locale: frLocale,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: this.eventService.getEvents()
  };

  currentEvents: EventApi[] = [];

  constructor(private router: Router, private eventService: EventService ) {}

  ngOnInit(): void {}

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    this.router.navigate(['/appointments-form'], { queryParams: { date: selectInfo.startStr } });
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'événement '${clickInfo.event.title}' ?`)) {
      clickInfo.event.remove(); 
      this.eventService.removeEvent(clickInfo.event.id); 
    }
  }

}