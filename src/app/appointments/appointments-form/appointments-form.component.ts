import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from '../../banner/banner.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../service/event.service';
import { createEventId } from '../../event-utils';

@Component({
  selector: 'app-appointments-form',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent, BannerComponent],
  templateUrl: './appointments-form.component.html',
  styleUrl: './appointments-form.component.css'
})
export class AppointmentsFormComponent {
  public selectedDate!: string;

  constructor(private router: Router, 
    private route: ActivatedRoute,  
    private eventService: EventService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedDate = params['date'];
    });
  }


  onSubmit(form: any) {
    console.log('Form submitted', form);
    this.eventService.addEvent({
      id: createEventId(),
      title: form.value.title,
      start: this.selectedDate,
      allDay: true
    });
    this.router.navigate(['/calendar']);
  }
}
