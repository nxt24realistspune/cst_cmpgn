import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AGENT_API_URL, API_BASE_URL, LINK_CHECKER_API_URL } from '../../constants/api-constants';
import { SummaryReport } from '../summary-report/summary-report';
import { AnalysisLoaderComponent } from '../analysis-loader/analysis-loader.component';
import { RouterModule } from '@angular/router';
import { LinkCheckerComponent } from '../link-checker/link-checker.component';
import { LinkCheckerReport } from '../link-checker-report/link-checker-report';

@Component({
  selector: 'app-qa-platform',
  standalone: true,
  imports: [
    CommonModule,
    SummaryReport,
    AnalysisLoaderComponent,
    RouterModule,
    LinkCheckerComponent,
    LinkCheckerReport,
  ],
  templateUrl: './qa-platform.component.html',
  styleUrls: ['./qa-platform.component.css'],
})
export class QaPlatformComponent {
  @ViewChild('leftFileInput') leftFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('rightFileInput') rightFileInput!: ElementRef<HTMLInputElement>;

  leftFile: File | null = null;
  rightFile: File | null = null;
  isProcessing: boolean = false;
  result: any = null;
  response1: any = null;

  private apiEndpoint = API_BASE_URL + AGENT_API_URL;
  private apiEndpoint2 = API_BASE_URL + LINK_CHECKER_API_URL;
  constructor(private http: HttpClient) {}

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  onLeftFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.leftFile = input.files[0];
    }
  }

  onRightFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.rightFile = input.files[0];
    }
  }

  removeLeftFile(): void {
    this.leftFile = null;
    if (this.leftFileInput) {
      this.leftFileInput.nativeElement.value = '';
    }
  }

  removeRightFile(): void {
    this.rightFile = null;
    if (this.rightFileInput) {
      this.rightFileInput.nativeElement.value = '';
    }
  }

  onCheckFiles(): void {
    if (!this.leftFile || !this.rightFile) {
      return;
    }

    this.isProcessing = true;

    const formData = new FormData();
    formData.append('html_file', this.rightFile, this.rightFile.name);
    formData.append('image', this.leftFile, this.leftFile.name);
    formData.append('leftFile', this.leftFile);
    formData.append('rightFile', this.rightFile);

    const formData2 = new FormData();
    formData2.append('html_file', this.rightFile, this.rightFile.name);
    this.http.post(this.apiEndpoint, formData).subscribe({
      next: (response) => {
        this.result = response;

        this.isProcessing = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.result = { error: 'Failed to process files' };
        this.isProcessing = false;
      },
    });

    this.http
      .post(this.apiEndpoint2, formData2, {
        headers: {
          accept: 'application/json',
          // 'content-type': 'multipart/form-data',
        },
      })
      .subscribe({
        next: (res) => {
          this.response1 = res;
          // this.loading = false;
        },
        error: (err) => {
          // this.error = 'Failed to check links: ' + err.message;
          // this.loading = false;
        },
      });
  }

  isValid(obj: any): boolean {
    return obj && obj.final_generated_response;
  }
}
