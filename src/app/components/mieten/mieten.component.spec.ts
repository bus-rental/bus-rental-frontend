import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MietenComponent } from './mieten.component';

describe('MietenComponent', () => {
  let component: MietenComponent;
  let fixture: ComponentFixture<MietenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MietenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MietenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
