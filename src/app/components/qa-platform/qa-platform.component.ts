import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { QaAnalysisService } from '../../services/qa-analysis.service';
import { QaResults, ReasoningLog, SelectedIssue, TabType } from '../../models/qa-platform.models';

// Import all components
import { HeaderComponent } from '../header/header.component';
import { UploadTabComponent } from '../upload-tab/upload-tab.component';
import { ResultsTabComponent } from '../results-tab/results-tab.component';
import { ObservabilityMatrixComponent } from '../observability-matrix/observability-matrix.component';
import { ReasoningWindowComponent } from '../reasoning-window/reasoning-window.component';
import { IssueDetailModalComponent } from '../issue-detail-modal/issue-detail-modal.component';

@Component({
  selector: 'app-qa-platform',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    UploadTabComponent,
    ResultsTabComponent,
    ObservabilityMatrixComponent,
    ReasoningWindowComponent,
    IssueDetailModalComponent
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <!-- Header -->
      <app-header 
        [analysisComplete]="analysisComplete()"
        [showReasoningWindow]="showReasoningWindow()"
        (reasoningWindowToggled)="toggleReasoningWindow()">
      </app-header>

      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="flex gap-6">
          <!-- Main Content -->
          <div [class]="getMainContentClasses()">
            <!-- Tabs -->
            <div class="flex gap-2 mb-6">
              <button
                (click)="setActiveTab('upload')"
                [class]="getTabClasses('upload')">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                Upload & Configure
              </button>
              <button
                (click)="setActiveTab('results')"
                [disabled]="!analysisComplete()"
                [class]="getTabClasses('results')">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                QA Results
              </button>
              <button
                (click)="setActiveTab('matrix')"
                [disabled]="!analysisComplete()"
                [class]="getTabClasses('matrix')">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M19 11H5m14-7H5m14 14H5"/>
                </svg>
                Observability Matrix
              </button>
            </div>

            <!-- Tab Content -->
            <app-upload-tab 
              *ngIf="activeTab() === 'upload'"
              #uploadTab
              (analyzeRequested)="handleAnalyzeRequested()">
            </app-upload-tab>

            <app-results-tab 
              *ngIf="activeTab() === 'results' && analysisComplete()"
              [qaResults]="qaResults()"
              (issueSelected)="selectIssue($event)">
            </app-results-tab>

            <app-observability-matrix 
              *ngIf="activeTab() === 'matrix' && analysisComplete()"
              [qaResults]="qaResults()">
            </app-observability-matrix>
          </div>

          <!-- Reasoning Window -->
          <app-reasoning-window
            [showWindow]="showReasoningWindow()"
            [reasoningLogs]="reasoningLogs()"
            [analyzing]="analyzing()"
            (windowClosed)="closeReasoningWindow()">
          </app-reasoning-window>
        </div>
      </div>

      <!-- Issue Detail Modal -->
      <app-issue-detail-modal
        [issue]="selectedIssue()"
        (modalClosed)="closeIssueModal()">
      </app-issue-detail-modal>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class QaPlatformComponent implements OnInit {
  @ViewChild('uploadTab') uploadTab?: UploadTabComponent;

  // Reactive signals
  activeTab = signal<TabType>('upload');
  analyzing = signal(false);
  analysisComplete = signal(false);
  showReasoningWindow = signal(false);
  qaResults = signal<QaResults | null>(null);
  reasoningLogs = signal<ReasoningLog[]>([]);
  selectedIssue = signal<SelectedIssue | null>(null);

  constructor(private qaAnalysisService: QaAnalysisService) {
    // Subscribe to service observables
    this.qaAnalysisService.analyzing$
      .pipe(takeUntilDestroyed())
      .subscribe(analyzing => {
        this.analyzing.set(analyzing);
        if (this.uploadTab) {
          this.uploadTab.setAnalyzing(analyzing);
        }
      });

    this.qaAnalysisService.qaResults$
      .pipe(takeUntilDestroyed())
      .subscribe(results => {
        if (results) {
          this.qaResults.set(results);
          this.analysisComplete.set(true);
          this.setActiveTab('results');
        }
      });

    this.qaAnalysisService.reasoningLogs$
      .pipe(takeUntilDestroyed())
      .subscribe(logs => {
        this.reasoningLogs.set(logs);
      });
  }

  ngOnInit(): void {
    // Component initialization
  }

  setActiveTab(tab: TabType): void {
    if (tab === 'results' || tab === 'matrix') {
      if (!this.analysisComplete()) return;
    }
    this.activeTab.set(tab);
  }

  toggleReasoningWindow(): void {
    this.showReasoningWindow.set(!this.showReasoningWindow());
  }

  closeReasoningWindow(): void {
    this.showReasoningWindow.set(false);
  }

  async handleAnalyzeRequested(): Promise<void> {
    this.showReasoningWindow.set(true);
    await this.qaAnalysisService.runQaAnalysis();
  }

  selectIssue(issue: SelectedIssue): void {
    this.selectedIssue.set(issue);
  }

  closeIssueModal(): void {
    this.selectedIssue.set(null);
  }

  getMainContentClasses(): string {
    const baseClasses = 'flex-1 transition-all';
    return this.showReasoningWindow() 
      ? `${baseClasses} max-w-[60%]` 
      : `${baseClasses} max-w-full`;
  }

  getTabClasses(tab: TabType): string {
    const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all';
    const isActive = this.activeTab() === tab;
    const isDisabled = (tab === 'results' || tab === 'matrix') && !this.analysisComplete();

    if (isDisabled) {
      return `${baseClasses} bg-white/30 text-slate-400 cursor-not-allowed`;
    }

    return isActive
      ? `${baseClasses} bg-white text-blue-600 shadow-md`
      : `${baseClasses} bg-white/50 text-slate-600 hover:bg-white/80`;
  }
}