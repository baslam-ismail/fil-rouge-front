import { Injectable } from '@angular/core';
import { EventInput } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: EventInput[] = [];

  getEvents(): EventInput[] {
    return this.events;
  }

  addEvent(event: EventInput): void {
    this.events.push(event);
  }

  removeEvent(eventId: string): void {
    this.events = this.events.filter(event => event.id !== eventId);
  }
}