import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { API_BASE_URL, LINK_CHECKER_API_URL } from '../../constants/api-constants';

@Component({
  selector: 'app-link-checker',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './link-checker.component.html',
  styleUrls: ['./link-checker.component.css'],
})
export class LinkCheckerComponent {
  selectedFile: File | null = null;
  response: any = null;
  loading: boolean = false;
  error: string = '';

  private apiEndpoint = API_BASE_URL + LINK_CHECKER_API_URL;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'text/html') {
      this.selectedFile = file;
      this.error = '';
    } else {
      this.error = 'Please select a valid HTML file';
      this.selectedFile = null;
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.error = '';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  checkLinks(): void {
    if (!this.selectedFile) {
      this.error = 'Please select an HTML file first';
      return;
    }

    this.loading = true;
    this.error = '';
    this.response = null;

    const formData = new FormData();
    formData.append('html_file', this.selectedFile, this.selectedFile.name);

    this.http
      .post(this.apiEndpoint, formData, {
        headers: {
          'accept': 'application/json'
          // 'content-type': 'multipart/form-data',
        },
      })
      .subscribe({
        next: (res) => {
          this.response = res;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to check links: ' + err.message;
          this.loading = false;
        },
      });
  }
}
