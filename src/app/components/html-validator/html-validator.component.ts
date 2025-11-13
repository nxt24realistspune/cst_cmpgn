import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-html-validator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './html-validator.component.html',
  styleUrls: ['./html-validator.component.css']
})
export class HtmlValidatorComponent {
  selectedFiles: {
    eml?: File;
    xlsx1?: File;
    xlsx2?: File;
    xlsx3?: File;
    pdf?: File;
  } = {};

  isValidating = false;
  validationResults: any = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event, fileType: keyof typeof this.selectedFiles): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles[fileType] = input.files[0];
    }
  }

  isAnyFileSelected(): boolean {
    return Object.keys(this.selectedFiles).length > 0;
  }

  performAgenticValidation(): void {
    this.isValidating = true;
    this.validationResults = null;

    const formData = new FormData();

    (Object.keys(this.selectedFiles) as Array<keyof typeof this.selectedFiles>).forEach(key => {
      const file = this.selectedFiles[key];
      if (file) {
        formData.append(key, file);
      }
    });

    // Replace with your actual API endpoint
    const apiEndpoint = '/api/agentic-validation';

    this.http.post(apiEndpoint, formData).subscribe({
      next: (response) => {
        this.validationResults = response;
        this.isValidating = false;
      },
      error: (error) => {
        console.error('Validation failed:', error);
        this.validationResults = { error: 'Validation failed', details: error.message };
        this.isValidating = false;
      }
    });
  }
}
