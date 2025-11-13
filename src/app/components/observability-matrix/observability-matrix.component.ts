import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaResults } from '../../models/qa-platform.models';

@Component({
  selector: 'app-observability-matrix',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6" *ngIf="qaResults">
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 class="text-xl font-bold text-slate-900 mb-4">Agent Observability Matrix</h2>
        <p class="text-sm text-slate-600 mb-6">Performance metrics and analysis breakdown across all AI agents</p>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-200">
                <th class="text-left py-3 px-4 text-sm font-semibold text-slate-900">Agent Name</th>
                <th class="text-center py-3 px-4 text-sm font-semibold text-slate-900">Total Issues</th>
                <th class="text-center py-3 px-4 text-sm font-semibold text-slate-900">Critical</th>
                <th class="text-center py-3 px-4 text-sm font-semibold text-slate-900">Auto-Fixable</th>
                <th class="text-center py-3 px-4 text-sm font-semibold text-slate-900">Avg Time</th>
                <th class="text-center py-3 px-4 text-sm font-semibold text-slate-900">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr *ngFor="let row of qaResults.observabilityMatrix" class="hover:bg-slate-50">
                <td class="py-4 px-4">
                  <div class="font-medium text-slate-900">{{row.agent}}</div>
                </td>
                <td class="py-4 px-4 text-center">
                  <span class="inline-flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full font-semibold text-slate-900">
                    {{row.issues}}
                  </span>
                </td>
                <td class="py-4 px-4 text-center">
                  <span [class]="getCriticalBadgeClass(row.critical)">
                    {{row.critical}}
                  </span>
                </td>
                <td class="py-4 px-4 text-center">
                  <span class="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full font-semibold text-green-900">
                    {{row.autoFix}}
                  </span>
                </td>
                <td class="py-4 px-4 text-center">
                  <div class="flex items-center justify-center gap-1 text-sm text-slate-600">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{row.avgTime}}
                  </div>
                </td>
                <td class="py-4 px-4 text-center">
                  <span class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{row.status}}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="bg-purple-100 p-2 rounded-lg">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-slate-900">Total Iterations</h3>
          </div>
          <div class="text-3xl font-bold text-slate-900 mb-2">2</div>
          <p class="text-sm text-slate-600">Agent reasoning loops executed</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="bg-blue-100 p-2 rounded-lg">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-slate-900">Total Analysis Time</h3>
          </div>
          <div class="text-3xl font-bold text-slate-900 mb-2">8.3s</div>
          <p class="text-sm text-slate-600">End-to-end QA completion</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="bg-green-100 p-2 rounded-lg">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-slate-900">Automation Rate</h3>
          </div>
          <div class="text-3xl font-bold text-slate-900 mb-2">47%</div>
          <p class="text-sm text-slate-600">Issues eligible for auto-fix</p>
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
export class ObservabilityMatrixComponent {
  @Input() qaResults: QaResults | null = null;

  getCriticalBadgeClass(critical: number): string {
    const baseClass = 'inline-flex items-center justify-center w-8 h-8 rounded-full font-semibold';
    return critical > 0 
      ? `${baseClass} bg-red-100 text-red-900`
      : `${baseClass} bg-slate-100 text-slate-500`;
  }
}