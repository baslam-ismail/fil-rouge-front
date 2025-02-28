import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DailyOperation } from '../daily-operations.model';

@Component({
  selector: 'app-daily-operation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './daily-operations-modal.component.html',
  styleUrls: ['./daily-operations-modal.component.css']
})
export class DailyOperationModalComponent {
  @Input() operation!: DailyOperation;
  @Output() close = new EventEmitter<void>();
  @Output() update = new EventEmitter<{ operation: DailyOperation; response: string }>();

  currentDate = new Date();

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close.emit();
    }
  }

  updateOperation() {
    this.update.emit({
      operation: this.operation,
      response: this.operation.comments || ''
    });
  }
}
