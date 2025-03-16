import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BannerComponent } from '../../banner/banner.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../service/event.service';
import { createEventId } from '../../event-utils';

@Component({
  selector: 'app-appointments-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, SidebarComponent, BannerComponent],
  templateUrl: './appointments-form.component.html',
  styleUrl: './appointments-form.component.css'
})
export class AppointmentsFormComponent {
  public selectedDate!: string;

  appointmentsForm = this.fb.group({
    reason: ['', [Validators.required, Validators.minLength(7)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    timeSlot: ['', Validators.required],
    location: ['', Validators.required],
    priority: ['', Validators.required]
    
    
  });

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute, 
    private eventService: EventService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedDate = params['date'];
    });
  }


  onSubmit() {
    if (this.appointmentsForm.valid) {
      console.log('Form submitted', this.appointmentsForm.value);
      this.eventService.addEvent({
        id: createEventId(),
        title: this.appointmentsForm.value.reason || '',
        start: this.selectedDate,
        allDay: true
      });
      alert("Votre rendez-vous a bien été créé !");
      this.appointmentsForm.reset(); 
      this.router.navigate(['/calendar']);
    } else {
      alert("Veuillez remplir correctement le formulaire.");
    }
  }  
}
