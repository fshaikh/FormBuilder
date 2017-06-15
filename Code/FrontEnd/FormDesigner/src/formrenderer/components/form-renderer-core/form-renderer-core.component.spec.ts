import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRendererCoreComponent } from './form-renderer-core.component';

describe('FormRendererCoreComponent', () => {
  let component: FormRendererCoreComponent;
  let fixture: ComponentFixture<FormRendererCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRendererCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRendererCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
