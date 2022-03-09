import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidarLoginComponent } from './form-validar-login.component';

describe('FormValidarLoginComponent', () => {
  let component: FormValidarLoginComponent;
  let fixture: ComponentFixture<FormValidarLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormValidarLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormValidarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
