import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlDemoComponent } from './ml-demo.component';

describe('MlDemoComponent', () => {
  let component: MlDemoComponent;
  let fixture: ComponentFixture<MlDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
