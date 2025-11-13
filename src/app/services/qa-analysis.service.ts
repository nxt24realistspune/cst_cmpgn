import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { QaResults, ReasoningLog } from '../models/qa-platform.models';

@Injectable({
  providedIn: 'root'
})
export class QaAnalysisService {
  private _qaResults = new BehaviorSubject<QaResults | null>(null);
  private _reasoningLogs = new BehaviorSubject<ReasoningLog[]>([]);
  private _analyzing = new BehaviorSubject<boolean>(false);
  private _currentAgent = new BehaviorSubject<string | null>(null);
  private _agentResponse = new BehaviorSubject<any>(null); // New subject for agent responses

  public qaResults$ = this._qaResults.asObservable();
  public reasoningLogs$ = this._reasoningLogs.asObservable();
  public analyzing$ = this._analyzing.asObservable();
  public currentAgent$ = this._currentAgent.asObservable();
  public agentResponse$ = this._agentResponse.asObservable(); // Expose agent response observable

  simulateAgenticReasoning(): ReasoningLog[] {
    return [
      { timestamp: '0.1s', agent: 'Orchestrator', type: 'info', message: 'QA analysis initiated via CTA plugin trigger', iteration: 1 },
      { timestamp: '0.2s', agent: 'Orchestrator', type: 'info', message: 'Loading campaign context: Q4 Holiday Promotion', iteration: 1 },
      { timestamp: '0.3s', agent: 'Orchestrator', type: 'info', message: 'Retrieved brand guidelines: Company Brand 2024', iteration: 1 },
      { timestamp: '0.5s', agent: 'Copy QA Agent', type: 'start', message: 'Analyzing email copy against campaign guidelines...', iteration: 1 },
      { timestamp: '1.2s', agent: 'Copy QA Agent', type: 'reasoning', message: 'Detected tone inconsistency: Subject line uses casual "Hey there!" while body is formal', iteration: 1 },
      { timestamp: '1.3s', agent: 'Copy QA Agent', type: 'reasoning', message: 'Cross-referencing with brand voice guidelines: Formal tone required for this segment', iteration: 1 },
      { timestamp: '1.5s', agent: 'Copy QA Agent', type: 'decision', message: 'Decision: Flag as HIGH severity - tone alignment critical for brand consistency', iteration: 1 },
      { timestamp: '1.8s', agent: 'Copy QA Agent', type: 'reasoning', message: 'Validating all hyperlinks in email content...', iteration: 1 },
      { timestamp: '2.1s', agent: 'Copy QA Agent', type: 'error', message: 'CRITICAL: CTA link points to staging URL (staging.example.com/offer)', iteration: 1 },
      { timestamp: '2.2s', agent: 'Copy QA Agent', type: 'decision', message: 'Decision: Flag as CRITICAL - Production link required before deployment', iteration: 1 },
      { timestamp: '2.5s', agent: 'Copy QA Agent', type: 'complete', message: 'Copy analysis complete: 5 issues identified', iteration: 1 },
      { timestamp: '2.6s', agent: 'Visual Assets QA Agent', type: 'start', message: 'Evaluating visual elements against brand standards...', iteration: 1 },
      { timestamp: '3.1s', agent: 'Visual Assets QA Agent', type: 'reasoning', message: 'Analyzing hero-product.jpg: Resolution 800x600px detected', iteration: 1 },
      { timestamp: '3.2s', agent: 'Visual Assets QA Agent', type: 'reasoning', message: 'Brand guidelines require minimum 1200x900px for hero images', iteration: 1 },
      { timestamp: '3.3s', agent: 'Visual Assets QA Agent', type: 'decision', message: 'Decision: Flag as HIGH severity - Image quality impacts brand perception', iteration: 1 },
      { timestamp: '3.7s', agent: 'Visual Assets QA Agent', type: 'reasoning', message: 'Checking color accuracy: Primary CTA button color #FF5733', iteration: 1 },
      { timestamp: '3.9s', agent: 'Visual Assets QA Agent', type: 'error', message: 'Brand color mismatch: Should be #FF6B35 (∆E = 12.4)', iteration: 1 },
      { timestamp: '4.0s', agent: 'Visual Assets QA Agent', type: 'decision', message: 'Decision: Auto-fix available - Update CSS color value', iteration: 1 },
      { timestamp: '4.3s', agent: 'Visual Assets QA Agent', type: 'complete', message: 'Visual analysis complete: 6 issues identified', iteration: 1 },
      { timestamp: '4.4s', agent: 'Structural QA Agent', type: 'start', message: 'Analyzing HTML structure and email client compatibility...', iteration: 1 },
      { timestamp: '5.1s', agent: 'Structural QA Agent', type: 'reasoning', message: 'Parsing HTML structure: Detected flexbox layout in CTA section', iteration: 1 },
      { timestamp: '5.3s', agent: 'Structural QA Agent', type: 'reasoning', message: 'Testing compatibility: Outlook 2016-2019 has poor flexbox support', iteration: 1 },
      { timestamp: '5.4s', agent: 'Structural QA Agent', type: 'decision', message: 'Decision: Flag as HIGH - Recommend table-based layout for better compatibility', iteration: 1 },
      { timestamp: '5.8s', agent: 'Structural QA Agent', type: 'reasoning', message: 'Checking accessibility: Missing lang attribute in <html> tag', iteration: 1 },
      { timestamp: '5.9s', agent: 'Structural QA Agent', type: 'error', message: 'CRITICAL: Accessibility violation - Screen readers need lang attribute', iteration: 1 },
      { timestamp: '6.0s', agent: 'Structural QA Agent', type: 'decision', message: 'Decision: Auto-fix available - Add lang="en" to HTML tag', iteration: 1 },
      { timestamp: '6.5s', agent: 'Structural QA Agent', type: 'complete', message: 'Structural analysis complete: 6 issues identified', iteration: 1 },
      { timestamp: '6.7s', agent: 'Orchestrator', type: 'info', message: 'All agents completed initial analysis', iteration: 1 },
      { timestamp: '6.8s', agent: 'Orchestrator', type: 'info', message: 'Generating observability matrix...', iteration: 1 },
      { timestamp: '7.2s', agent: 'Fix Recommendation Engine', type: 'start', message: 'Analyzing fixable issues and generating recommendations...', iteration: 2 },
      { timestamp: '7.5s', agent: 'Fix Recommendation Engine', type: 'reasoning', message: 'Identified 8 auto-fixable issues (47% of total)', iteration: 2 },
      { timestamp: '7.8s', agent: 'Fix Recommendation Engine', type: 'reasoning', message: 'Generating code modifications for structural fixes...', iteration: 2 },
      { timestamp: '8.1s', agent: 'Fix Recommendation Engine', type: 'complete', message: 'Fix recommendations ready: 8 auto-fixes, 9 manual reviews', iteration: 2 },
      { timestamp: '8.3s', agent: 'Orchestrator', type: 'success', message: 'QA analysis complete! Overall score: 78%', iteration: 2 }
    ];
  }

  async runQaAnalysis(htmlContent?: string): Promise<void> {
    this._analyzing.next(true);
    this._reasoningLogs.next([]);

    const logs = this.simulateAgenticReasoning();

    // Simulate progressive log updates
    for (let i = 0; i < logs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const currentLogs = this._reasoningLogs.value;
      this._reasoningLogs.next([...currentLogs, logs[i]]);
      this._currentAgent.next(logs[i].agent);
    }

    // Set the final results
    this._qaResults.next(this.getMockQaResults());
    this._analyzing.next(false);

    // If HTML content is provided, simulate agent response
    if (htmlContent) {
      this._agentResponse.next({ success: true, message: 'Agent received the HTML content for analysis.', htmlContent });
    }
  }

  private getMockQaResults(): QaResults {
    return {
      overallScore: 78,
      summary: {
        critical: 2,
        high: 4,
        medium: 8,
        low: 3,
        autoFixable: 8,
        manualReview: 9
      },
      observabilityMatrix: [
        { agent: 'Copy QA Agent', issues: 5, critical: 1, autoFix: 2, avgTime: '2.5s', status: 'complete' },
        { agent: 'Visual Assets QA Agent', issues: 6, critical: 0, autoFix: 3, avgTime: '1.7s', status: 'complete' },
        { agent: 'Structural QA Agent', issues: 6, critical: 1, autoFix: 3, avgTime: '2.1s', status: 'complete' }
      ],
      categories: [
        {
          name: 'Email Copy Quality',
          score: 72,
          agent: 'Copy QA Agent',
          iteration: 1,
          issues: [
            {
              severity: 'critical',
              type: 'Broken Link',
              issue: 'CTA link points to staging URL: staging.example.com/offer',
              location: 'Primary CTA button, line 156',
              recommendation: 'Replace with production URL: www.example.com/offer',
              autoFixable: true,
              codeSnippet: '<a href="https://staging.example.com/offer">Shop Now</a>',
              suggestedFix: '<a href="https://www.example.com/offer">Shop Now</a>',
              reasoning: 'Production URLs are required for campaign deployment. Staging URLs will result in broken user experience.'
            },
            {
              severity: 'high',
              type: 'Tone Inconsistency',
              issue: 'Subject line uses casual tone "Hey there!" while body uses formal language',
              location: 'Subject line and opening paragraph',
              recommendation: 'Align tone across subject and body copy - suggest "Hello [Name]" for consistency with formal body tone',
              autoFixable: false,
              reasoning: 'Brand guidelines specify formal tone for Premium Customer segment. Inconsistent tone reduces professional perception.'
            },
            {
              severity: 'medium',
              type: 'Grammar',
              issue: 'Missing comma after introductory phrase',
              location: 'Paragraph 2, line 178: "To get started simply click..."',
              recommendation: 'Add comma after "To get started"',
              autoFixable: true,
              codeSnippet: 'To get started simply click the button below.',
              suggestedFix: 'To get started, simply click the button below.'
            },
            {
              severity: 'medium',
              type: 'CTA Clarity',
              issue: 'Generic CTA text "Learn More" lacks specificity',
              location: 'Secondary CTA, line 223',
              recommendation: 'Use action-oriented text: "Explore Premium Features" or "View Product Details"',
              autoFixable: false,
              reasoning: 'Specific CTAs improve click-through rates by 24% according to campaign performance data.'
            },
            {
              severity: 'low',
              type: 'Subject Line Length',
              issue: 'Subject line is 78 characters, exceeds optimal 40-60 character range',
              location: 'Email metadata',
              recommendation: 'Shorten to "Exclusive Offer: Save 30% Today" (35 characters)',
              autoFixable: false
            }
          ]
        },
        {
          name: 'Visual Assets Compliance',
          score: 81,
          agent: 'Visual Assets QA Agent',
          iteration: 1,
          issues: [
            {
              severity: 'high',
              type: 'Image Resolution',
              issue: 'Hero image resolution is 800x600px, below minimum 1200x900px requirement for retina displays',
              location: 'Hero section: hero-product.jpg',
              recommendation: 'Replace with higher resolution image (1920x1440px recommended) or use 2x scaled version',
              autoFixable: false,
              imageAnalysis: {
                currentRes: '800x600',
                requiredRes: '1200x900',
                aspectRatio: '4:3',
                fileSize: '245KB'
              },
              reasoning: 'Low resolution images appear pixelated on modern high-DPI displays, negatively impacting brand perception.'
            },
            {
              severity: 'high',
              type: 'Brand Color Accuracy',
              issue: 'Secondary CTA button uses #FF5733 instead of brand-approved #FF6B35',
              location: 'Footer section, line 234',
              recommendation: 'Update button background-color to #FF6B35',
              autoFixable: true,
              codeSnippet: 'background-color: #FF5733;',
              suggestedFix: 'background-color: #FF6B35;',
              colorDelta: '∆E = 12.4 (noticeable difference)',
              reasoning: 'Color consistency is critical for brand recognition. Delta-E value >10 indicates visually distinct colors.'
            },
            {
              severity: 'medium',
              type: 'Alt Text Missing',
              issue: 'Product image lacks descriptive alt text for accessibility',
              location: 'Product showcase section, img tag line 203',
              recommendation: 'Add alt text: "Premium wireless headphones in matte black finish"',
              autoFixable: true,
              codeSnippet: '<img src="product.jpg">',
              suggestedFix: '<img src="product.jpg" alt="Premium wireless headphones in matte black finish">'
            },
            {
              severity: 'medium',
              type: 'Typography Weight',
              issue: 'Heading font-weight is 600, brand guidelines specify 700 for all H1 headings',
              location: 'Hero heading, line 89',
              recommendation: 'Change font-weight from 600 to 700',
              autoFixable: true,
              codeSnippet: 'font-weight: 600;',
              suggestedFix: 'font-weight: 700;'
            },
            {
              severity: 'low',
              type: 'Image Optimization',
              issue: 'Hero image file size (245KB) could be optimized for faster loading',
              location: 'hero-product.jpg',
              recommendation: 'Compress image to ~150KB using WebP format or optimize JPEG compression',
              autoFixable: false,
              reasoning: 'Smaller image sizes improve email load time, especially on mobile connections.'
            },
            {
              severity: 'low',
              type: 'Spacing Consistency',
              issue: 'Inconsistent padding between sections (24px vs 32px)',
              location: 'Section dividers throughout email',
              recommendation: 'Standardize section spacing to 32px for visual rhythm',
              autoFixable: true
            }
          ]
        },
        {
          name: 'HTML Structure & Compatibility',
          score: 75,
          agent: 'Structural QA Agent',
          iteration: 1,
          issues: [
            {
              severity: 'critical',
              type: 'Accessibility Violation',
              issue: 'Missing lang attribute in HTML tag',
              location: 'Line 1: <html>',
              recommendation: 'Add lang="en" to HTML tag for screen reader compatibility',
              autoFixable: true,
              codeSnippet: '<html>',
              suggestedFix: '<html lang="en">',
              reasoning: 'WCAG 2.1 Level A requirement. Screen readers need language declaration for proper pronunciation.'
            },
            {
              severity: 'high',
              type: 'Email Client Compatibility',
              issue: 'Flexbox layout in CTA section may not render correctly in Outlook 2016-2019',
              location: 'CTA button container, lines 145-160',
              recommendation: 'Replace flexbox with table-based layout for consistent rendering across all email clients',
              autoFixable: true,
              affectedClients: ['Outlook 2016', 'Outlook 2019', 'Windows Mail'],
              codeSnippet: '<div style="display: flex; justify-content: center;">',
              suggestedFix: '<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td align="center">',
              reasoning: 'Outlook 2016-2019 has limited CSS support. Table-based layouts ensure consistent rendering.'
            },
            {
              severity: 'high',
              type: 'Mobile Responsiveness',
              issue: 'Fixed width container (600px) does not adapt to mobile viewports',
              location: 'Main container, line 45',
              recommendation: 'Add max-width: 100% and media queries for responsive scaling',
              autoFixable: true,
              codeSnippet: '<table width="600">',
              suggestedFix: '<table width="600" style="max-width: 100%;">'
            },
            {
              severity: 'medium',
              type: 'Font Size Accessibility',
              issue: 'Footer legal text uses 12px font, below minimum 14px for mobile readability',
              location: 'Footer legal text, line 289',
              recommendation: 'Increase to 14px with media query for mobile devices',
              autoFixable: true,
              codeSnippet: 'font-size: 12px;',
              suggestedFix: 'font-size: 14px;',
              reasoning: 'WCAG guidelines recommend minimum 14px for body text on mobile devices.'
            },
            {
              severity: 'medium',
              type: 'Link Styling',
              issue: 'Links lack sufficient color contrast ratio (3.2:1, requires 4.5:1)',
              location: 'Footer links, lines 290-295',
              recommendation: 'Darken link color from #4A90E2 to #2563EB for WCAG AA compliance',
              autoFixable: true
            },
            {
              severity: 'low',
              type: 'Performance',
              issue: 'Inline CSS not minified, adds 2.3KB to email size',
              location: 'Style blocks throughout',
              recommendation: 'Minify CSS to reduce email size and improve load time',
              autoFixable: true,
              reasoning: 'Smaller email size reduces clipping in Gmail (102KB limit) and improves load time.'
            }
          ]
        }
      ]
    };
  }

  // New method to simulate calling an agent endpoint with HTML content
  async callAgentEndpoint(htmlContent: string): Promise<void> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock response from agent
    const response = {
      success: true,
      message: 'Agent received the HTML content for analysis.',
      htmlContent
    };

    this._agentResponse.next(response);
  }
}
