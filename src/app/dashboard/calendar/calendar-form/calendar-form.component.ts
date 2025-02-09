import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../../sidebar/sidebar.component";
import { BannerComponent } from "../../../banner/banner.component";

@Component({
  selector: 'app-calendar-form',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent, BannerComponent],
  templateUrl: './calendar-form.component.html',
  styleUrl: './calendar-form.component.css'
})
export class CalendarFormComponent {
  public selectedDate!: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedDate = params['date'];
    });
  }



  onSubmit(form: any) {
    console.log('Form submitted', form);
    this.router.navigate(['/appointments']);
  }

}
