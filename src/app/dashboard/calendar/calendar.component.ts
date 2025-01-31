import { afterNextRender, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Datepicker } from 'flowbite-datepicker';
import { FlowbiteService } from '../../service/flowbite.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  constructor(private flowbiteService: FlowbiteService) {
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
 
  this.initDatePicker();}

  initDatePicker(): void {
    let date = new Datepicker(this.dateField.nativeElement, {
      minDate: new Date(),
      todayHighlight: true,
      daysOfWeekDisabled: [0],
    });
    console.log('datepicker', date);
  }

  onDatePicked($event: any) {
    this.selectedDate = new Date($event.detail.date);
    console.log('onDatePicked', this.selectedDate);
  }

}
