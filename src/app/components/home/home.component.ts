import { Component } from '@angular/core';
import { AutoCardComponent } from "../auto-card/auto-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AutoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
