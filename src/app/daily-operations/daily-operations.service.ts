import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { DailyOperation, MOCK_DAILY_OPERATIONS } from './daily-operations.model';
import { OperationStatus } from "./daily-operations.enum";

@Injectable({
  providedIn: 'root'
})
export class DailyOperationsService {
  private operations = new BehaviorSubject<DailyOperation[]>([]);
  operations$ = this.operations.asObservable();

  constructor() {
    this.loadInitialData();
  }

  getDailyOperations(): Observable<DailyOperation[]> {
    return this.operations$;
  }

  getDailyOperationById(id: number): Observable<DailyOperation | undefined> {
    return this.operations$.pipe(
      map(operations => operations.find(operation => operation.id === id))
    );
  }

  updateDailyOperation(
    operationId: number,
    response: string,
    newStatus?: OperationStatus
  ): Observable<DailyOperation> {
    const updatedOperations = this.operations.value.map(operation => {
      if (operation.id === operationId) {
        return {
          ...operation,
          status: newStatus || operation.status,
          response,
          lastUpdated: new Date().toISOString()
        };
      }
      return operation;
    });

    const updatedOperation = updatedOperations.find(op => op.id === operationId);
    if (!updatedOperation) {
      throw new Error(`Operation with id ${operationId} not found`);
    }

    // Simuler un délai réseau
    return of(updatedOperation).pipe(
      delay(500),
      tap(() => {
        this.operations.next(updatedOperations);
      })
    );
  }

  deleteDailyOperation(id: number): Observable<void> {
    if (!this.operations.value.some(op => op.id === id)) {
      throw new Error(`Operation with id ${id} not found`);
    }

    const updatedOperations = this.operations.value.filter(
      operation => operation.id !== id
    );

    return of(void 0).pipe(
      delay(500),
      tap(() => {
        this.operations.next(updatedOperations);
      })
    );
  }

  private loadInitialData() {
    this.operations.next(MOCK_DAILY_OPERATIONS);
  }
}
