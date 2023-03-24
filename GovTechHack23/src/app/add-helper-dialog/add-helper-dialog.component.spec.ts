import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHelperDialogComponent } from './add-helper-dialog.component';

describe('AddHelperDialogComponent', () => {
  let component: AddHelperDialogComponent;
  let fixture: ComponentFixture<AddHelperDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHelperDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHelperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
