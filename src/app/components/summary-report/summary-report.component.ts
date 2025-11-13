import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Summary {
  num_working_links: number;
  num_broken_links: number;
  num_missing_images: number;
  num_alt_issues: number;
  score: number | string;
}

export interface Report {
  hero_image_status: string;
  logo_present: boolean;
  spelling_issues: string[];
  unsubscribe_link_present: boolean;
  final_recommendation: string;
  original_email: string;
  agent_suggestions: string;
}

@Component({
  selector: 'app-summary-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.css']
})
export class SummaryReportComponent {
  @Input() summary: Summary | null = null;
  @Input() report: Report | null = null;
}
