import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesignerChromeComponent } from './form-designer-chrome.component';

describe('FormDesignerChromeComponent', () => {
  let component: FormDesignerChromeComponent;
  let fixture: ComponentFixture<FormDesignerChromeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDesignerChromeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDesignerChromeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
