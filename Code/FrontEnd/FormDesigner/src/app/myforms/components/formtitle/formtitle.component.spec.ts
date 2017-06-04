import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormtitleComponent } from './formtitle.component';

describe('FormtitleComponent', () => {
  let component: FormtitleComponent;
  let fixture: ComponentFixture<FormtitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormtitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
