import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaResults, Issue, SelectedIssue } from '../../models/qa-platform.models';

@Component({
  selector: 'app-results-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6" *ngIf="qaResults">
      <!-- Score Overview -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-slate-900">QA Analysis Complete</h2>
            <p class="text-sm text-slate-600">3 specialized AI agents completed analysis in 8.3 seconds</p>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-slate-900 mb-1">{{qaResults.overallScore}}%</div>
            <div class="text-sm text-slate-600">Quality Score</div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-6 gap-3">
          <div class="bg-red-50 border border-red-200 rounded-lg p-3">
            <div class="text-xs text-red-600 font-medium mb-1">Critical</div>
            <div class="text-2xl font-bold text-red-900">{{qaResults.summary.critical}}</div>
          </div>
          <div class="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div class="text-xs text-orange-600 font-medium mb-1">High</div>
            <div class="text-2xl font-bold text-orange-900">{{qaResults.summary.high}}</div>
          </div>
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div class="text-xs text-yellow-600 font-medium mb-1">Medium</div>
            <div class="text-2xl font-bold text-yellow-900">{{qaResults.summary.medium}}</div>
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div class="text-xs text-blue-600 font-medium mb-1">Low</div>
            <div class="text-2xl font-bold text-blue-900">{{qaResults.summary.low}}</div>
          </div>
          <div class="bg-green-50 border border-green-200 rounded-lg p-3">
            <div class="text-xs text-green-600 font-medium mb-1">Auto-Fix</div>
            <div class="text-2xl font-bold text-green-900">{{qaResults.summary.autoFixable}}</div>
          </div>
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div class="text-xs text-purple-600 font-medium mb-1">Manual</div>
            <div class="text-2xl font-bold text-purple-900">{{qaResults.summary.manualReview}}</div>
          </div>
        </div>
      </div>

      <!-- Category Results -->
      <div *ngFor="let category of qaResults.categories"
           class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-slate-900 text-lg">{{category.name}}</h3>
              <p class="text-sm text-slate-600">Analyzed by {{category.agent}} • Iteration {{category.iteration}}</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="text-right">
                <div class="text-2xl font-bold text-slate-900">{{category.score}}%</div>
                <div class="text-xs text-slate-600">Score</div>
              </div>
              <div class="bg-white rounded-lg px-4 py-2 border border-slate-200">
                <div class="text-lg font-bold text-slate-900">{{category.issues.length}}</div>
                <div class="text-xs text-slate-600">Issues</div>
              </div>
            </div>
          </div>
        </div>

        <div class="divide-y divide-slate-100">
          <div *ngFor="let issue of category.issues"
               (click)="selectIssue(issue, category)"
               class="p-6 hover:bg-slate-50 transition-colors cursor-pointer">
            <div class="flex items-start gap-4">
              <div [class]="getSeverityClasses(issue.severity)">
                <svg [class]="getSeverityIconClasses(issue.severity)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path *ngIf="issue.severity === 'critical'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  <path *ngIf="issue.severity === 'high' || issue.severity === 'medium'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  <path *ngIf="issue.severity === 'low'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{issue.severity.toUpperCase()}}
              </div>

              <div class="flex-1">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex-1">
                    <h4 class="font-semibold text-slate-900 mb-1">{{issue.type}}</h4>
                    <p class="text-sm text-slate-700">{{issue.issue}}</p>
                  </div>
                  <button *ngIf="issue.autoFixable"
                          class="ml-4 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full hover:bg-green-200 transition-colors flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    Auto-fix
                  </button>
                </div>

                <div class="mt-3 space-y-2">
                  <div class="text-xs text-slate-500">
                    <span class="font-medium">Location:</span> {{issue.location}}
                  </div>
                  <div *ngIf="issue.reasoning" class="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <div class="text-xs font-medium text-purple-900 mb-1 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                      Agent Reasoning
                    </div>
                    <div class="text-sm text-purple-800">{{issue.reasoning}}</div>
                  </div>
                  <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div class="text-xs font-medium text-blue-900 mb-1 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Recommendation
                    </div>
                    <div class="text-sm text-blue-800">{{issue.recommendation}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ResultsTabComponent {
  @Input() qaResults: QaResults | null = null;
  @Output() issueSelected = new EventEmitter<SelectedIssue>();

  selectIssue(issue: Issue, category: any): void {
    const selectedIssue: SelectedIssue = {
      ...issue,
      category: category.name,
      agent: category.agent
    };
    this.issueSelected.emit(selectedIssue);
  }

  getSeverityClasses(severity: string): string {
    const baseClasses = 'px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1.5';
    switch(severity) {
      case 'critical': return `${baseClasses} bg-red-100 text-red-800 border-red-300`;
      case 'high': return `${baseClasses} bg-orange-100 text-orange-800 border-orange-300`;
      case 'medium': return `${baseClasses} bg-yellow-100 text-yellow-800 border-yellow-300`;
      case 'low': return `${baseClasses} bg-blue-100 text-blue-800 border-blue-300`;
      default: return `${baseClasses} bg-gray-100 text-gray-800 border-gray-300`;
    }
  }

  getSeverityIconClasses(severity: string): string {
    return 'w-4 h-4';
  }
}
