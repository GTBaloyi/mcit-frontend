import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuotationPdfComponent } from './view-quotation-pdf.component';

describe('ViewQuotationPdfComponent', () => {
  let component: ViewQuotationPdfComponent;
  let fixture: ComponentFixture<ViewQuotationPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewQuotationPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuotationPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
