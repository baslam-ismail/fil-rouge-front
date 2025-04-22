import { Component, OnInit, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-widget.component.html',
  styleUrl: './calendar-widget.component.css'
})
export class CalendarWidgetComponent implements OnInit {
  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  weekdayLabels: string[] = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  isBrowser: boolean;
  currentView: string = 'month'; // Par défaut, vue mensuelle

  // Données simulées d'événements avec types
  events: {date: Date, type: string}[] = [
    {date: new Date(2025, 3, 5), type: 'meeting'},
    {date: new Date(2025, 3, 12), type: 'deadline'},
    {date: new Date(2025, 3, 18), type: 'meeting'},
    {date: new Date(2025, 3, 25), type: 'reminder'}
  ];

  // Vérifier si une date a un événement
  hasEvent(date: Date): boolean {
    return this.events.some(event =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  }

  // Vérifier si une date a un type d'événement spécifique
  hasEventType(date: Date, type: string): boolean {
    return this.events.some(event =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear() &&
      event.type === type
    );
  }

  // Obtenir les jours du mois actuel
  getDaysInMonth(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }

  // Obtenir le jour de la semaine pour le premier jour du mois (0 = lundi, 6 = dimanche)
  getFirstDayOfMonth(date: Date): number {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1; // Ajustement pour commencer par lundi
  }

  // Fonctions de navigation
  prevMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.cdr.detectChanges();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.cdr.detectChanges();
  }

  // Formater la date pour afficher le mois et l'année
  formatMonthYear(date: Date): string {
    const month = date.toLocaleDateString('fr-FR', { month: 'long' });
    return month.charAt(0).toUpperCase() + month.slice(1) + ' ' + date.getFullYear();
  }

  // Vérifier si une date est aujourd'hui
  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  // Vérifier si une date est sélectionnée
  isSelected(date: Date): boolean {
    return date.getDate() === this.selectedDate.getDate() &&
           date.getMonth() === this.selectedDate.getMonth() &&
           date.getFullYear() === this.selectedDate.getFullYear();
  }

  // Obtenir un délai d'animation pour chaque cellule
  getAnimationDelay(index: number): string {
    return `--i: ${index}`;
  }

  // Sélectionner une date
  selectDate(date: Date): void {
    this.selectedDate = date;
    // Ajouter une animation visuelle pour le feedback
    this.cdr.detectChanges();
    setTimeout(() => {
      this.navigateToCalendar();
    }, 300); // Délai pour l'animation visuelle
  }

  // Changer de mode d'affichage
  changeMode(mode: string): void {
    this.currentView = mode;

    // Dans une implémentation réelle, nous changerions la vue ici
    // Pour cette démonstration, nous mettons simplement à jour l'état actif

    // Notification à l'utilisateur que la fonctionnalité est en développement
    if (mode !== 'month') {
      alert(`Vue ${mode} en cours de développement`);
    }

    this.cdr.detectChanges();
  }

  // Naviguer vers la page de calendrier complète avec la date sélectionnée
  navigateToCalendar(): void {
    this.router.navigate(['/calendar'], { queryParams: { date: this.selectedDate.toISOString() } });
  }

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Vérifier si nous sommes dans un environnement navigateur
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Initialiser avec la date du jour
    this.currentDate = new Date();
    this.selectedDate = new Date();

    // Mettre à jour les événements pour le mois en cours
    this.updateEvents();
  }

  // Mettre à jour les événements (simulé pour le moment)
  updateEvents(): void {
    const currentMonth = this.currentDate.getMonth();
    const currentYear = this.currentDate.getFullYear();

    // Créer des événements pour ce mois (simulation)
    this.events = [
      {date: new Date(currentYear, currentMonth, 5), type: 'meeting'},
      {date: new Date(currentYear, currentMonth, 12), type: 'deadline'},
      {date: new Date(currentYear, currentMonth, 18), type: 'meeting'},
      {date: new Date(currentYear, currentMonth, 25), type: 'reminder'}
    ];
  }
}
