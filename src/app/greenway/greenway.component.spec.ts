import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenwayComponent } from './greenway.component';

describe('GreenwayComponent', () => {
  let component: GreenwayComponent;
  let fixture: ComponentFixture<GreenwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenwayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
