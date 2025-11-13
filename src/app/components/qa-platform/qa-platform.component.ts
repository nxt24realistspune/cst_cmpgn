import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AGENT_API_URL, API_BASE_URL } from '../../constants/api-constants';
import { SummaryReport } from "../summary-report/summary-report";

@Component({
  selector: 'app-qa-platform',
  standalone: true,
  imports: [CommonModule, SummaryReport],
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
        this.result = [
          {
            agent_name: 'CopyQA',
            status: 'OK',
            tone_of_email: 'Professional',
            links_status: true,
            working_links: ['https://example.com?p=promo'],
            broken_links: [],
            corrected_email: '',
            original_email:
              '<!doctype html>\n<html>\n  <head><meta charset="utf-8"><title>Promo</title></head>\n  <body>\n    <h1>Welcom to our sale!</h1>\n    <p>Don\'t miss out on this amazing offer. Click <a href="https://example.com?p=promo">here</a> to redeem.</p>\n    <img src="https://example.com/logo.png" alt="Company logo">\n    <button>Shop Now</button>\n  </body>\n</html>',
            agent_suggestions:
              '<!doctype html>\n<html>\n  <head><meta charset="utf-8"><title>Promo</title></head>\n  <body>\n    <h1>Welcome to our sale!</h1>\n    <p>Don\'t miss out on this amazing offer. Click <a href="https://example.com?p=promo">here</a> to redeem.</p>\n    <img src="https://example.com/logo.png" alt="Company logo">\n    <button>Shop Now</button>\n  </body>\n</html>',
            subject_line: 'Promo',
            subject_line_quality: '',
            preview_text: '',
            spam_trigger_words: [],
            personalization_tokens_valid: true,
            missing_personalization_tokens: [],
            images_found: ['https://example.com/logo.png'],
            missing_images: [],
            alt_text_issues: [],
            hero_image_status: 'Missing',
            cta_buttons: [],
            cta_text_quality: 'Clear',
            cta_clickability_status: 'Good',
            branding_compliance: 'Unknown',
            logo_present: true,
            color_scheme_valid: true,
            font_compliance_issues: [],
            grammar_issues: [],
            spelling_issues: ['Welcom'],
            unsubscribe_link_present: true,
            privacy_policy_link_present: false,
            footer_compliance_status: 'Missing',
            layout_rendering_issues: [],
            mobile_responsiveness_issues: [],
            content_accuracy_issues: [],
            offer_details_status: 'Unclear',
            tracking_pixel_present: false,
            overall_quality_score: 85.0,
            final_recommendation:
              'Add missing elements such as unsubscribe link, privacy policy, and footer information. Correct spelling errors.',
            _generated_at: '2025-11-13T17:55:45.092092Z',
            _summary: {
              num_working_links: 1,
              num_broken_links: 0,
              num_missing_images: 0,
              num_alt_issues: 0,
              score: 85.0,
            },
          },
        ];
        // this.result = { error: 'Failed to process files' };
        this.isProcessing = false;
      },
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
