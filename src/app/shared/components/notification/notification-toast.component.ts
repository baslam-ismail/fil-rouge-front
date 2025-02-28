import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-toast.component.html',
  styleUrls: ['./notification-toast.component.css']
})
export class NotificationToastComponent implements OnInit, OnDestroy {
  activeNotifications: (Notification & { id: number })[] = [];
  private subscription = new Subscription();
  private counter = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription.add(
      this.notificationService.notifications$.subscribe(notification => {
        this.showNotification(notification);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private showNotification(notification: Notification) {
    const id = ++this.counter;

    this.activeNotifications = [
      ...this.activeNotifications,
      { ...notification, id }
    ];

    setTimeout(() => {
      this.removeNotification(id);
    }, notification.duration);
  }

  removeNotification(id: number) {
    this.activeNotifications = this.activeNotifications.filter(
      notification => notification.id !== id
    );
  }
}
