import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new Subject<Notification>();
  notifications$ = this.notifications.asObservable();

  show(notification: Notification) {
    this.notifications.next({
      ...notification,
      duration: notification.duration || 3000 // Durée par défaut 3 secondes
    });
  }

  success(message: string, duration?: number) {
    this.show({
      message,
      type: 'success',
      duration
    });
  }

  error(message: string, duration?: number) {
    this.show({
      message,
      type: 'error',
      duration
    });
  }

  info(message: string, duration?: number) {
    this.show({
      message,
      type: 'info',
      duration
    });
  }
}
