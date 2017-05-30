import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyformsComponent } from './myforms.component';

describe('MyformsComponent', () => {
  let component: MyformsComponent;
  let fixture: ComponentFixture<MyformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
