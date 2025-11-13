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
        (reasoningWindowToggled)="toggleReasoningWindow()">
      </app-header>

      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="flex gap-6">
          <!-- Main Content -->
          <div class="flex-1 transition-all">
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
                (click)="setActiveTab('reasoning')"
                [class]="getTabClasses('reasoning')">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Agentic Reasoning Output
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
            >
            </app-upload-tab>

            <!-- Reasoning Tab Content -->
            <div *ngIf="activeTab() === 'reasoning'" class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div class="bg-slate-900 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
                <div class="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <h3 class="font-semibold text-white text-sm">Agentic Reasoning Output</h3>
                  </div>
                </div>

                <div class="h-[calc(100vh-300px)] overflow-y-auto bg-slate-900 p-4 font-mono text-xs">
                  <div *ngIf="reasoningLogs().length === 0" class="text-slate-500 text-center py-8">
                    No reasoning logs yet. Click "Run QA Analysis" to start.
                  </div>

                  <div *ngIf="reasoningLogs().length > 0" class="space-y-2">
                    <div *ngFor="let log of reasoningLogs(); let i = index"
                         class="flex gap-3 items-start animate-fadeIn">
                      <div class="text-slate-500 shrink-0">{{log.timestamp}}</div>
                      <svg class="w-3 h-3 text-slate-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                      <div class="flex-1">
                        <span [class]="getLogTypeColor(log.type) + ' font-semibold'">
                          [{{log.agent}}]
                        </span>
                        <span *ngIf="log.iteration > 1" class="text-yellow-500 ml-2">[Iteration {{log.iteration}}]</span>
                        <div class="text-slate-300 mt-1">{{log.message}}</div>
                      </div>
                    </div>
                  </div>

                  <div *ngIf="analyzing()" class="flex items-center gap-2 text-emerald-400 mt-4">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span>Agent reasoning in progress...</span>
                  </div>
                </div>
              </div>
            </div>

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
          <!-- <app-reasoning-window
            [showWindow]="showReasoningWindow()"
            [reasoningLogs]="reasoningLogs()"
            [analyzing]="analyzing()"
            (windowClosed)="closeReasoningWindow()">
          </app-reasoning-window> -->
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

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }

    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `]
})
export class QaPlatformComponent implements OnInit {
  @ViewChild('uploadTab') uploadTab?: UploadTabComponent;

  // Reactive signals
  activeTab = signal<TabType>('upload');
  analyzing = signal(false);
  analysisComplete = signal(false);
  // showReasoningWindow = signal(false);
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
    // this.showReasoningWindow.set(!this.showReasoningWindow());
  }

  closeReasoningWindow(): void {
    // this.showReasoningWindow.set(false);
  }

  async handleAnalyzeRequested(): Promise<void> {
    // this.showReasoningWindow.set(true);
    // await this.qaAnalysisService.runQaAnalysis();
  }

  selectIssue(issue: SelectedIssue): void {
    this.selectedIssue.set(issue);
  }

  closeIssueModal(): void {
    this.selectedIssue.set(null);
  }

  // getMainContentClasses(): string {
  //   const baseClasses = '';
  //   return this.showReasoningWindow()
  //     ? `${baseClasses} `
  //     : `${baseClasses} max-w-full`;
  // }

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

  getLogTypeColor(type: string): string {
    switch(type) {
      case 'start': return 'text-blue-600';
      case 'reasoning': return 'text-purple-600';
      case 'decision': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'complete': return 'text-emerald-600';
      case 'success': return 'text-green-700';
      default: return 'text-slate-600';
    }
  }
}
