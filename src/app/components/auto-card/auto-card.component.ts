import { Component, OnInit } from '@angular/core';
import { AutoService } from '../../services/auto.service';
import { AutoCardDto } from '../../dtos/auto-card-dto';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-auto-card',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule],
  templateUrl: './auto-card.component.html',
  styleUrl: './auto-card.component.css'
})
export class AutoCardComponent implements OnInit {
  auto!: AutoCardDto;

  constructor(private autoService: AutoService) {}

  ngOnInit(): void {
    this.auto = this.autoService.getCars()[0];
  }
}