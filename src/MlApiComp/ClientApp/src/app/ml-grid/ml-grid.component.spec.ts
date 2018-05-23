import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlGridComponent } from './ml-grid.component';

describe('MlGridComponent', () => {
  let component: MlGridComponent;
  let fixture: ComponentFixture<MlGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
