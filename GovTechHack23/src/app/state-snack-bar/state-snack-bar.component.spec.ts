import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateSnackBarComponent } from './state-snack-bar.component';

describe('StateSnackBarComponent', () => {
  let component: StateSnackBarComponent;
  let fixture: ComponentFixture<StateSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateSnackBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
