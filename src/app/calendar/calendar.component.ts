import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EventService } from '../service/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule,
           FullCalendarModule,
           SidebarComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {
  public selectedDate!: Date;
  private themeObserver: MutationObserver | null = null;
  private isDarkMode = true;

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locale: frLocale,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: this.eventService.getEvents(),
    themeSystem: 'standard',
    height: 'auto',
    contentHeight: 'auto',
    expandRows: true,
    fixedWeekCount: false,
    showNonCurrentDates: true,
    dayHeaderFormat: { weekday: 'short' },
    views: {
      dayGridMonth: {
        dayMaxEventRows: 3
      }
    }
  };

  currentEvents: EventApi[] = [];

  constructor(
    private router: Router,
    private eventService: EventService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isDarkMode = !document.documentElement.hasAttribute('data-theme');
    this.applyThemeToCalendar();

    this.setupThemeObserver();
  }

  ngOnDestroy(): void {
    if (this.themeObserver) {
      this.themeObserver.disconnect();
    }
  }

  setupThemeObserver(): void {
    this.themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          this.isDarkMode = !document.documentElement.hasAttribute('data-theme');
          this.applyThemeToCalendar();
        }
      });
    });

    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  applyThemeToCalendar(): void {
    // Ajuster la hauteur en fonction de la taille de l'écran
    const windowHeight = window.innerHeight;
    const isMobile = window.innerWidth <= 768;

    this.calendarOptions = {
      ...this.calendarOptions,
      themeSystem: 'standard',
      height: isMobile ? 'auto' : windowHeight - 150,
      aspectRatio: isMobile ? 0.8 : 1.35,
      expandRows: true,
      // Afficher moins d'événements sur mobile
      dayMaxEventRows: isMobile ? 2 : 3
    };

    this.changeDetector.detectChanges();
  }

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
