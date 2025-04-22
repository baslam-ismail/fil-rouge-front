import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface StatCard {
  icon: 'calendar' | 'clock' | 'info' | 'users' | 'credit-card' | 'dollar-sign' | 'bar-chart' | 'shield' | 'home'
      | 'file' | 'check' | 'alert-triangle' | 'user-plus' | 'clipboard' | 'activity' | 'award' | 'bookmark'
      | 'check-circle' | 'x-circle' | 'trending-up' | 'briefcase' | 'bell' | 'folder' | 'lock';
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'teal';
  label: string;
  value: number;
}

@Component({
  selector: 'app-stats-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-banner.component.html',
  styleUrls: ['./stats-banner.component.css']
})
export class StatsBannerComponent {
  @Input() stats: StatCard[] = [
    {
      icon: 'calendar',
      color: 'blue',
      label: 'Rendez-vous aujourd\'hui',
      value: 6
    },
    {
      icon: 'clock',
      color: 'green',
      label: 'En attente de confirmation',
      value: 15
    },
    {
      icon: 'info',
      color: 'orange',
      label: 'Rendez-vous annulés',
      value: 3
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  getIconSvg(iconType: string): SafeHtml {
    let svgContent = '';

    // Assurez-vous que la largeur et la hauteur sont définies directement dans le SVG
    const svgBase = `xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="min-width: 24px; min-height: 24px;"`;

    switch (iconType) {
      case 'calendar':
        svgContent = `<svg ${svgBase}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>`;
        break;
      case 'clock':
        svgContent = `<svg ${svgBase}>
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>`;
        break;
      case 'info':
        svgContent = `<svg ${svgBase}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>`;
        break;
      case 'users':
        svgContent = `<svg ${svgBase}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>`;
        break;
      case 'credit-card':
        svgContent = `<svg ${svgBase}>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>`;
        break;
      case 'dollar-sign':
        svgContent = `<svg ${svgBase}>
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>`;
        break;
      case 'bar-chart':
        svgContent = `<svg ${svgBase}>
          <line x1="12" y1="20" x2="12" y2="10"></line>
          <line x1="18" y1="20" x2="18" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="16"></line>
        </svg>`;
        break;
      case 'shield':
        svgContent = `<svg ${svgBase}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>`;
        break;
      case 'home':
        svgContent = `<svg ${svgBase}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>`;
        break;
      case 'file':
        svgContent = `<svg ${svgBase}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>`;
        break;
      case 'check':
        svgContent = `<svg ${svgBase}>
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>`;
        break;
      case 'alert-triangle':
        svgContent = `<svg ${svgBase}>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>`;
        break;
      case 'user-plus':
        svgContent = `<svg ${svgBase}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="20" y1="8" x2="20" y2="14"></line>
          <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>`;
        break;
      case 'clipboard':
        svgContent = `<svg ${svgBase}>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>`;
        break;
      case 'activity':
        svgContent = `<svg ${svgBase}>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>`;
        break;
      case 'award':
        svgContent = `<svg ${svgBase}>
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>`;
        break;
      case 'bookmark':
        svgContent = `<svg ${svgBase}>
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>`;
        break;
      case 'check-circle':
        svgContent = `<svg ${svgBase}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>`;
        break;
      case 'x-circle':
        svgContent = `<svg ${svgBase}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>`;
        break;
      case 'trending-up':
        svgContent = `<svg ${svgBase}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>`;
        break;
      case 'briefcase':
        svgContent = `<svg ${svgBase}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>`;
        break;
      case 'bell':
        svgContent = `<svg ${svgBase}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>`;
        break;
      case 'folder':
        svgContent = `<svg ${svgBase}>
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>`;
        break;
      case 'lock':
        svgContent = `<svg ${svgBase}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>`;
        break;
      default:
        // Icône par défaut si l'icône demandée n'existe pas
        svgContent = `<svg ${svgBase}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>`;
    }

    return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }
}
