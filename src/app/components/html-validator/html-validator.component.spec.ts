import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlValidator } from './html-validator';

describe('HtmlValidator', () => {
  let component: HtmlValidator;
  let fixture: ComponentFixture<HtmlValidator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlValidator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlValidator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
