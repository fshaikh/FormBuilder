import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListComponent } from './formlist.component';

describe('FormListComponent', () => {
  let component: FormListComponent;
  let fixture: ComponentFixture<FormListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
