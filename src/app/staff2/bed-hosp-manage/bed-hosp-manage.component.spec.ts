import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BedHospManageComponent } from './bed-hosp-manage.component';

describe('BedHospManageComponent', () => {
  let component: BedHospManageComponent;
  let fixture: ComponentFixture<BedHospManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedHospManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedHospManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
