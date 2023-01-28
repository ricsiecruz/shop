import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasHostComponent } from './offcanvas-host.component';

describe('OffcanvasHostComponent', () => {
  let component: OffcanvasHostComponent;
  let fixture: ComponentFixture<OffcanvasHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffcanvasHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffcanvasHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
