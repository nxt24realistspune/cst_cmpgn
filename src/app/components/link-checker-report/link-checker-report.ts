import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link-checker-report',
  imports: [CommonModule],
  templateUrl: './link-checker-report.html',
  styleUrl: './link-checker-report.css',
})
export class LinkCheckerReport {

  public _response: any;

  @Input()
  set response(value: any) {
    console.log('response input received:', value);
    this._response = value;
  }
}
