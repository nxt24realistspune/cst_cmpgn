import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-report',
  imports: [],
  templateUrl: './summary-report.html',
  styleUrl: './summary-report.css',
})
export class SummaryReport {

  //Input setter
  public _summary: any;
  public _report: any;

  @Input()
  set summary(value: any) {
    console.log('Summary input received:', value);
    this._summary = value;
  }

  get summary(): any {
    return this._summary;
  }

  @Input()
  set report(value: any) {
    console.log('Report input received:', value);
    this._report = value;
  }

  get report(): any {
    return this._report;
  }

}
