import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectedIssue } from '../../models/qa-platform.models';

@Component({
  selector: 'app-issue-detail-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="issue" 
         class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" 
         (click)="closeModal()">
      <div class="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" 
           (click)="$event.stopPropagation()">
        <div class="sticky top-0 bg-white border-b border-slate-200 p-6">
          <div class="flex items-start justify-between">
            <div>
              <div [class]="getSeverityClasses(issue.severity)">
                <svg [class]="getSeverityIconClasses()" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path *ngIf="issue.severity === 'critical'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  <path *ngIf="issue.severity === 'high' || issue.severity === 'medium'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  <path *ngIf="issue.severity === 'low'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="ml-1">{{issue.severity.toUpperCase()}} SEVERITY</span>
              </div>
              <h3 class="text-2xl font-bold text-slate-900">{{issue.type}}</h3>
              <p class="text-sm text-slate-600 mt-1">Detected by {{issue.agent}}</p>
            </div>
            <button (click)="closeModal()" class="text-slate-400 hover:text-slate-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="p-6 space-y-6">
          <div>
            <h4 class="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              Issue Description
            </h4>
            <p class="text-slate-700 bg-slate-50 p-4 rounded-lg">{{issue.issue}}</p>
          </div>

          <div>
            <h4 class="font-semibold text-slate-900 mb-2">Location</h4>
            <code class="block bg-slate-900 text-emerald-400 px-4 py-3 rounded-lg text-sm font-mono">
              {{issue.location}}
            </code>
          </div>

          <div *ngIf="issue.reasoning">
            <h4 class="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              Agent Reasoning
            </h4>
            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p class="text-sm text-purple-900">{{issue.reasoning}}</p>
            </div>
          </div>

          <div *ngIf="issue.codeSnippet">
            <h4 class="font-semibold text-slate-900 mb-2">Current Code</h4>
            <pre class="bg-slate-900 text-slate-300 px-4 py-3 rounded-lg text-sm font-mono overflow-x-auto">{{issue.codeSnippet}}</pre>
          </div>

          <div *ngIf="issue.suggestedFix">
            <h4 class="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Suggested Fix
            </h4>
            <pre class="bg-green-50 border border-green-200 text-green-900 px-4 py-3 rounded-lg text-sm font-mono overflow-x-auto">{{issue.suggestedFix}}</pre>
          </div>

          <div>
            <h4 class="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Recommendation
            </h4>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p class="text-sm text-blue-900">{{issue.recommendation}}</p>
            </div>
          </div>

          <div *ngIf="issue.imageAnalysis">
            <h4 class="font-semibold text-slate-900 mb-2">Image Analysis</h4>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-slate-50 p-3 rounded-lg">
                <div class="text-xs text-slate-600 mb-1">Current Resolution</div>
                <div class="font-semibold text-slate-900">{{issue.imageAnalysis.currentRes}}</div>
              </div>
              <div class="bg-slate-50 p-3 rounded-lg">
                <div class="text-xs text-slate-600 mb-1">Required Resolution</div>
                <div class="font-semibold text-slate-900">{{issue.imageAnalysis.requiredRes}}</div>
              </div>
            </div>
          </div>

          <div *ngIf="issue.colorDelta">
            <h4 class="font-semibold text-slate-900 mb-2">Color Analysis</h4>
            <div class="bg-slate-50 p-3 rounded-lg">
              <div class="text-xs text-slate-600 mb-1">Color Difference</div>
              <div class="font-semibold text-slate-900">{{issue.colorDelta}}</div>
            </div>
          </div>

          <div *ngIf="issue.affectedClients && issue.affectedClients.length > 0">
            <h4 class="font-semibold text-slate-900 mb-2">Affected Email Clients</h4>
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let client of issue.affectedClients" 
                    class="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                {{client}}
              </span>
            </div>
          </div>

          <div class="flex gap-3 pt-4 border-t border-slate-200">
            <button *ngIf="issue.autoFixable" 
                    class="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Apply Auto-Fix
            </button>
            <button *ngIf="!issue.autoFixable" 
                    class="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Mark for Manual Review
            </button>
            <button class="px-4 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium">
              Dismiss
            </button>
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
export class IssueDetailModalComponent {
  @Input() issue: SelectedIssue | null = null;
  @Output() modalClosed = new EventEmitter<void>();

  closeModal(): void {
    this.modalClosed.emit();
  }

  getSeverityClasses(severity: string): string {
    const baseClasses = 'inline-flex px-3 py-1 rounded-full border text-xs font-semibold mb-3';
    switch(severity) {
      case 'critical': return `${baseClasses} bg-red-100 text-red-800 border-red-300`;
      case 'high': return `${baseClasses} bg-orange-100 text-orange-800 border-orange-300`;
      case 'medium': return `${baseClasses} bg-yellow-100 text-yellow-800 border-yellow-300`;
      case 'low': return `${baseClasses} bg-blue-100 text-blue-800 border-blue-300`;
      default: return `${baseClasses} bg-gray-100 text-gray-800 border-gray-300`;
    }
  }

  getSeverityIconClasses(): string {
    return 'w-4 h-4';
  }
}