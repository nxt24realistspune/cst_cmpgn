import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http-service';

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
            [(ngModel)]="emailCopy"
            class="w-full h-32 p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-sm bg-white"
            placeholder="Paste your email copy/content here... The text that will be analyzed for tone, grammar, and messaging."
          ></textarea>
          <div class="mt-2">
            <label
              class="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors"
            >
              <input
                #fileInput
                accept=".txt"
                class="hidden"
                type="file"
                multiple
                (change)="onFileSelected($event)"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-gray-600"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span class="text-sm text-gray-700">Or upload copy files (.txt)</span>
            </label>
          </div>

          <!-- Uploaded Files Display Cells -->
          @if (uploadedFiles().length > 0) {
          <div class="mt-3 space-y-2">
            @for (file of uploadedFiles(); track file.name; let i = $index) {
            <div class="p-4 bg-green-50 border-2 border-green-500 rounded-lg">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-green-600"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                    <path d="M10 9H8"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-green-600 flex-shrink-0"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span class="text-xs font-semibold text-green-800 uppercase"
                      >File Uploaded</span
                    >
                  </div>
                  <p class="text-sm font-medium text-gray-900 truncate">{{ file.name }}</p>
                  <p class="text-xs text-gray-600 mt-1">{{ formatFileSize(file.size) }}</p>
                </div>
                <button
                  type="button"
                  (click)="removeFile(i)"
                  class="flex-shrink-0 p-1.5 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                  title="Remove file"
                >
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
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path
                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    ></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>
            }
          </div>
          }
        </div>
        <div class="space-y-4">
          <br />
          <h3 class="font-semibold text-slate-900">Campaign Configuration</h3>

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Campaign Name</label>
              <input
                type="text"
                [(ngModel)]="campaignName"
                placeholder="Enter Campaign Name"
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
                <option value="" disabled selected>Select an option</option>
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
              <option value="" disabled selected>Select an option</option>
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
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  /**
   *
   */
  constructor(private httpService: HttpService) {}

  campaignName = signal('');
  emailCopy = signal('');
  brandProfile = signal('');
  audienceSegment = signal('');
  autoFix = signal(false);
  showReasoningLogs = signal(false);
  generateFixRecommendations = signal(false);
  uploadedFiles = signal<File[]>([]);
  // analyzing = signal(false);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const validTypes = ['.txt'];
      const newFiles: File[] = [];
      const invalidFiles: string[] = [];

      // Validate all selected files
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

        if (validTypes.includes(fileExtension)) {
          newFiles.push(file);
        } else {
          invalidFiles.push(file.name);
        }
      }

      // Add valid files to the existing array
      if (newFiles.length > 0) {
        this.uploadedFiles.update((files) => [...files, ...newFiles]);
        console.log(`${newFiles.length} file(s) uploaded successfully`);
      }

      // Show alert for invalid files
      if (invalidFiles.length > 0) {
        alert(
          `The following files are not supported:\n${invalidFiles.join(
            '\n'
          )}\n\nPlease upload only .txt, .doc, or .docx files`
        );
      }
      // Read file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        console.log('File content:', text);
        // You can store this in a signal or variable
        // this.emailCopyContent.set(text);
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      for (let i = 0; i < input.files.length; i++) {
        reader.readAsText(input.files[i]);
      }
      // Reset the input to allow uploading the same files again
      input.value = '';
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.update((files) => files.filter((_, i) => i !== index));
    console.log('File removed');
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  runAnalysis(): void {
    console.log(this.emailCopy());
    console.log(this.campaignName());
    console.log(this.brandProfile());
    console.log(this.audienceSegment());
    console.log(this.autoFix());
    console.log(this.showReasoningLogs());
    console.log(this.generateFixRecommendations());
    this.httpService.dashboardAgent(this.emailCopy()).subscribe((data) => console.log(data));
  }
}
