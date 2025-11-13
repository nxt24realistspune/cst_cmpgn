import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div
          class="border-2 border-gray-200 rounded-lg p-4 bg-gradient-to-r from-orange-50 to-orange-100"
        >
          <div class="flex items-center gap-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-file-text text-orange-600"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
            <label class="text-sm font-bold text-gray-800">Email Copy</label>
          </div>
          <textarea
            class="w-full h-32 p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-sm bg-white"
            placeholder="Paste your email copy/content here... The text that will be analyzed for tone, grammar, and messaging."
          ></textarea>
          <div class="mt-2">
            <label
              class="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors"
              ><input accept=".txt,.doc,.docx" class="hidden" type="file" /><span
                class="text-sm text-gray-700"
                >Or upload copy file (.txt, .doc, .docx)</span
              ></label
            >
          </div>
        </div>
        <div class="space-y-4">
          <br/>
          <h3 class="font-semibold text-slate-900">Campaign Configuration</h3>

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Campaign Name</label>
              <input
                type="text"
                [(ngModel)]="campaignName"
                class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2"
                >Brand Guidelines Profile</label
              >
              <select
                [(ngModel)]="brandProfile"
                class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Company Brand 2024">Company Brand 2024</option>
                <option value="Holiday Campaign Style">Holiday Campaign Style</option>
                <option value="Corporate Communications">Corporate Communications</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2"
              >Target Audience Segment</label
            >
            <select
              [(ngModel)]="audienceSegment"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Premium Customers">Premium Customers</option>
              <option value="New Subscribers">New Subscribers</option>
              <option value="Lapsed Users">Lapsed Users</option>
            </select>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-blue-600 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <div>
                <h4 class="font-medium text-blue-900 mb-1">CTA Plugin Integration Active</h4>
                <p class="text-sm text-blue-700">
                  Click "Run QA Analysis" to trigger agent-driven testing workflow
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                [(ngModel)]="autoFix"
                class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span class="text-sm text-slate-700">Enable auto-fix for fixable issues</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                [(ngModel)]="showReasoningLogs"
                class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span class="text-sm text-slate-700">Show detailed reasoning logs</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                [(ngModel)]="generateFixRecommendations"
                class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span class="text-sm text-slate-700">Generate fix recommendation engine output</span>
            </label>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          (click)="runAnalysis()"
          class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ 'Run QA Analysis (CTA Plugin)' }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .animate-spin {
        animation: spin 1s linear infinite;
      }
    `,
  ],
})
export class UploadTabComponent {
  @Output() analyzeRequested = new EventEmitter<void>();

  campaignName = signal('Q4 Holiday Promotion');
  brandProfile = signal('Company Brand 2024');
  audienceSegment = signal('Premium Customers');
  autoFix = signal(true);
  showReasoningLogs = signal(true);
  generateFixRecommendations = signal(false);
  // analyzing = signal(false);

  runAnalysis(): void {
    // this.analyzing.set(true);
    this.analyzeRequested.emit();
  }

  setAnalyzing(analyzing: boolean): void {
    // this.analyzing.set(analyzing);
  }
}
