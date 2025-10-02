import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitFormComponent } from './profit-form.component';

describe('ProfitFormComponent', () => {
  let component: ProfitFormComponent;
  let fixture: ComponentFixture<ProfitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfitFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
