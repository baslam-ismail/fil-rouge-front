import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<span [innerHTML]="svgIcon"></span>`,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    span {
      display: flex;
    }
  `]
})
export class IconComponent implements OnChanges {
  @Input() name: string = '';
  @Input() size: number = 24;
  @Input() color: string = 'currentColor';
  
  svgIcon: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] || changes['size'] || changes['color']) {
      this.updateIcon();
    }
  }

  private updateIcon(): void {
    const iconSvg = this.getIconSvg();
    if (iconSvg) {
      this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(iconSvg);
    }
  }

  private getIconSvg(): string {
    const sizeAttr = `width="${this.size}" height="${this.size}"`;
    const colorStyle = `stroke="${this.color}"`;
    
    switch (this.name) {
      case 'calendar':
        return `<svg xmlns="http://www.w3.org/2000/svg" ${sizeAttr} viewBox="0 0 24 24" fill="none" ${colorStyle} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>`;
      case 'clock':
        return `<svg xmlns="http://www.w3.org/2000/svg" ${sizeAttr} viewBox="0 0 24 24" fill="none" ${colorStyle} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>`;
      case 'info':
        return `<svg xmlns="http://www.w3.org/2000/svg" ${sizeAttr} viewBox="0 0 24 24" fill="none" ${colorStyle} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>`;
      case 'users':
        return `<svg xmlns="http://www.w3.org/2000/svg" ${sizeAttr} viewBox="0 0 24 24" fill="none" ${colorStyle} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>`;
      case 'credit-card':
        return `<svg xmlns="http://www.w3.org/2000/svg" ${sizeAttr} viewBox="0 0 24 24" fill="none" ${colorStyle} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>`;
      case 'dollar-sign':
        return `<svg xmlns="http://www.w3.org/2000/svg" ${sizeAttr} viewBox="0 0 24 24" fill="none" ${colorStyle} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>`;
      case 'bar-chart':
        return `<svg xmlns="http://www.w3.org/2000/svg" ${sizeAttr} viewBox="0 0 24 24" fill="none" ${colorStyle} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="20" x2="12" y2="10"></line>
          <line x1="18" y1="20" x2="18" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="16"></line>
        </svg>`;
      case 'shield':
        return `<svg xmlns="http://www.w3.org/2000/svg" ${sizeAttr} viewBox="0 0 24 24" fill="none" ${colorStyle} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>`;
      case 'home':
        return `<svg xmlns="http://www.w3.org/2000/svg" ${sizeAttr} viewBox="0 0 24 24" fill="none" ${colorStyle} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>`;
      default:
        return '';
    }
  }
}
