import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReponseComponent } from './view-reponse.component';

describe('ViewReponseComponent', () => {
  let component: ViewReponseComponent;
  let fixture: ComponentFixture<ViewReponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
