import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AGENT_API_URL, API_BASE_URL } from '../../constants/api-constants';

@Component({
  selector: 'app-qa-platform',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qa-platform.component.html',
  styleUrls: ['./qa-platform.component.css']
})
export class QaPlatformComponent {
  @ViewChild('leftFileInput') leftFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('rightFileInput') rightFileInput!: ElementRef<HTMLInputElement>;

  leftFile: File | null = null;
  rightFile: File | null = null;
  isProcessing: boolean = false;
  result: any = null;

  private apiEndpoint = API_BASE_URL + AGENT_API_URL; // Replace with actual endpoint

  constructor(private http: HttpClient) {}

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
    formData.append('leftFile', this.leftFile);
    formData.append('rightFile', this.rightFile);

    this.http.post(this.apiEndpoint, formData).subscribe({
      next: (response) => {
        this.result = response;
        this.isProcessing = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.result = { error: 'Failed to process files' };
        this.isProcessing = false;
      }
    });
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;

    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
}
