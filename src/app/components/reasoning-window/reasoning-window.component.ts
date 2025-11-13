import { Component, EventEmitter, Input, Output, OnChanges, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReasoningLog } from '../../models/qa-platform.models';

@Component({
  selector: 'app-reasoning-window',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-[40%] space-y-4" *ngIf="showWindow">
      <div class="bg-slate-900 rounded-xl shadow-2xl border border-slate-700 overflow-hidden sticky top-4">
        <div class="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <h3 class="font-semibold text-white text-sm">Agentic Reasoning Output</h3>
          </div>
          <button 
            (click)="closeWindow()"
            class="text-slate-400 hover:text-white transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </button>
        </div>
        
        <div #scrollContainer class="h-[calc(100vh-200px)] overflow-y-auto bg-slate-900 p-4 font-mono text-xs">
          <div *ngIf="reasoningLogs.length === 0" class="text-slate-500 text-center py-8">
            No reasoning logs yet. Click "Run QA Analysis" to start.
          </div>
          
          <div *ngIf="reasoningLogs.length > 0" class="space-y-2">
            <div *ngFor="let log of reasoningLogs; let i = index" 
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
            <div #scrollEnd></div>
          </div>
          
          <div *ngIf="analyzing" class="flex items-center gap-2 text-emerald-400 mt-4">
            <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>Agent reasoning in progress...</span>
          </div>
        </div>
      </div>
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
export class ReasoningWindowComponent implements OnChanges, AfterViewChecked {
  @Input() showWindow = false;
  @Input() reasoningLogs: ReasoningLog[] = [];
  @Input() analyzing = false;
  @Output() windowClosed = new EventEmitter<void>();

  @ViewChild('scrollContainer') scrollContainer?: ElementRef;
  @ViewChild('scrollEnd') scrollEnd?: ElementRef;

  private shouldScrollToBottom = false;

  ngOnChanges(): void {
    if (this.reasoningLogs.length > 0) {
      this.shouldScrollToBottom = true;
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  closeWindow(): void {
    this.windowClosed.emit();
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

  private scrollToBottom(): void {
    if (this.scrollEnd?.nativeElement) {
      this.scrollEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}