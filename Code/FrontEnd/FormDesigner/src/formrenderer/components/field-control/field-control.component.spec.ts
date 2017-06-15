import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldControlComponent } from './field-control.component';

describe('FieldControlComponent', () => {
  let component: FieldControlComponent;
  let fixture: ComponentFixture<FieldControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
