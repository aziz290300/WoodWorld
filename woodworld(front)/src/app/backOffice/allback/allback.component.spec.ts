import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllbackComponent } from './allback.component';

describe('AllbackComponent', () => {
  let component: AllbackComponent;
  let fixture: ComponentFixture<AllbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
