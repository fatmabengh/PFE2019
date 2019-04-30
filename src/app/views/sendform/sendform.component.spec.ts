import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendformComponent } from './sendform.component';

describe('SendformComponent', () => {
  let component: SendformComponent;
  let fixture: ComponentFixture<SendformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
