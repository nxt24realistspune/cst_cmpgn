import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analysis-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analysis-loader.component.html',
  styleUrls: ['./analysis-loader.component.css']
})
export class AnalysisLoaderComponent implements OnInit, OnDestroy {
  @Input() isVisible: boolean = false;
  @Input() logoPath: string = '../../../assets/MPLogo.png';

  currentStep: number = 0;
  loadingMessage: string = 'Preparing your files...';
  currentTip: string = '';

  private stepInterval: any;
  private tipInterval: any;

  private loadingMessages = [
    'Uploading your files...',
    'Processing reference file...',
    'Analyzing HTML structure...',
    'Comparing designs...',
    'Generating detailed report...',
    'Almost there...'
  ];

  private tips = [
    'Did you know? MailPolish can detect over 100 different email rendering issues!',
    'Pro tip: Always test your emails across different email clients.',
    'Fun fact: The average person spends 3 seconds deciding whether to read an email.',
    'Quality matters: 42% of users delete emails that don\'t render correctly.',
    'Best practice: Keep your email width between 600-640px for optimal viewing.',
    'Did you know? Dark mode support is crucial for modern email design.',
  ];

  ngOnInit(): void {
    this.currentTip = this.getRandomTip();
    if (this.isVisible) {
      this.startLoadingAnimation();
    }
  }

  ngOnChanges(): void {
    if (this.isVisible) {
      this.startLoadingAnimation();
    } else {
      this.stopLoadingAnimation();
    }
  }

  private startLoadingAnimation(): void {
    this.currentStep = 1;
    this.loadingMessage = this.loadingMessages[0];
    let messageIndex = 0;

    // Progress through steps
    this.stepInterval = setInterval(() => {
      if (this.currentStep < 3) {
        this.currentStep++;
      }
      messageIndex++;
      if (messageIndex < this.loadingMessages.length) {
        this.loadingMessage = this.loadingMessages[messageIndex];
      }
    }, 20000); // Change step every 20 seconds

    // Rotate tips
    this.tipInterval = setInterval(() => {
      this.currentTip = this.getRandomTip();
    }, 8000); // Change tip every 8 seconds
  }

  private stopLoadingAnimation(): void {
    if (this.stepInterval) {
      clearInterval(this.stepInterval);
    }
    if (this.tipInterval) {
      clearInterval(this.tipInterval);
    }
    this.currentStep = 3; // Complete
  }

  private getRandomTip(): string {
    return this.tips[Math.floor(Math.random() * this.tips.length)];
  }

  ngOnDestroy(): void {
    this.stopLoadingAnimation();
  }
}
