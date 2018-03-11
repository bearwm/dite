import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugUserComponent } from './debug-user.component';

describe('DebugUserComponent', () => {
  let component: DebugUserComponent;
  let fixture: ComponentFixture<DebugUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebugUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
