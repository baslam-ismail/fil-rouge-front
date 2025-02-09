import { afterNextRender, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Datepicker } from 'flowbite-datepicker';
import { FlowbiteService } from '../../service/flowbite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService, private router: Router) {
    afterNextRender(() => {
      // this only runs in the browser
      this.flowbiteService.loadFlowbite((flowbite) => {
        console.log('Flowbite loaded', flowbite);
      });
    });
  }

  @ViewChild('dateField', { static: true }) dateField!: ElementRef;

  public selectedDate!: Date;

  ngOnInit(): void { 
    this.initDatePicker();
  }

  initDatePicker(): void {
    if (typeof document !== 'undefined') {
      let date = new Datepicker(this.dateField.nativeElement, {
        weekStart: 1,
        minDate: new Date(),
        todayHighlight: true,
        daysOfWeekDisabled: [0],
      });
      console.log('datepicker', date);
    }
  }

  onDatePicked($event: any) {
    this.selectedDate = new Date($event.detail.date);
    console.log('onDatePicked', this.selectedDate);
    this.router.navigate(['/calendar-form'], { queryParams: { date: this.selectedDate.toISOString() } });
  }
}