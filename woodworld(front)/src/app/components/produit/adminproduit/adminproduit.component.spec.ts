import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminproduitComponent } from './adminproduit.component';

describe('AdminproduitComponent', () => {
  let component: AdminproduitComponent;
  let fixture: ComponentFixture<AdminproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminproduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
