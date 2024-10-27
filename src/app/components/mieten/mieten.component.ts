import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mieten',
  standalone: true,
  imports: [MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './mieten.component.html',
  styleUrl: './mieten.component.css'
})
export class MietenComponent {
  startDate = new Date();
  endDate = new Date();
  selectedTimeSlot: string = "";

  setStartDate(event: any): void {
    this.startDate = event.value;
  }

  setEndDate(event: any): void {
    this.endDate = event.value;
  }

  rentCar(): void {
    if (this.startDate && this.selectedTimeSlot) {
      console.log(`Car rented on ${this.startDate} for ${this.selectedTimeSlot}`);
      // Implement the logic to handle car rental
    } else {
      console.log('Please select a date and time slot');
    }
  }
}