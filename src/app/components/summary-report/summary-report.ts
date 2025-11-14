import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-summary-report',
  imports: [],
  templateUrl: './summary-report.html',
  styleUrl: './summary-report.css',
})
export class SummaryReport implements AfterViewInit {
  //Input setter
  public _summary: any;
  public _report: any;
  public _originalEmail = '';
  public _correctedEmail = '';

  @Input()
  set summary(value: any) {
    console.log('Summary input received:', value);
    this._summary = value;
  }

  @Input()
  set report(value: any) {
    console.log('Report input received:', value);
    this._report = value;
    this._originalEmail = this.cleanEscapedHtml(this._report?.original_email);
    this._correctedEmail = this.cleanEscapedHtml(this._report?.corrected_email);

  }

  ngAfterViewInit() {
    this.setIframeContent(this._originalEmail);
    this.setIframeCorrectedContent(this._correctedEmail);
  }

  @ViewChild('iframeOrig') frame!: ElementRef;

  setIframeContent(html: string) {
    const cleaned = html
      .replace(/^"|"$/g, '')
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\\\/g, '\\');

    const iframe = this.frame.nativeElement as HTMLIFrameElement;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    doc?.open();
    doc?.write(cleaned);
    doc?.close();
  }

  @ViewChild('iframeCorrected') frameCorrected!: ElementRef;

  setIframeCorrectedContent(html: string) {
    const cleaned = html
      .replace(/^"|"$/g, '')
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\\\/g, '\\');

    const iframe = this.frameCorrected.nativeElement as HTMLIFrameElement;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    doc?.open();
    doc?.write(cleaned);
    doc?.close();
  }


  private cleanEscapedHtml(raw: string): string {
    return raw
      .replace(/^"|"$/g, '') // remove wrapping quotes
      .replace(/\\"/g, '"') // convert \" to "
      .replace(/\\n/g, '\n') // convert \n to actual newline
      .replace(/\\\\/g, '\\'); // fix double backslashes
  }
}
