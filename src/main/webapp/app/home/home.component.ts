import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { interval, Subject, Subscription, of } from 'rxjs';
import { takeUntil, switchMap, catchError, tap } from 'rxjs/operators';
import { FloatingActionButtonComponent } from '../floating-action-button/floating-action-button.component'; // Import the new component


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink,  FloatingActionButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  environment = environment;
  serverState: 'checking' | 'wakingUp' | 'running' = 'checking';
  private destroy$ = new Subject<void>();
  private statusSubscription: Subscription | null = null;
  private fastInterval = 5000;
  private slowInterval = 14.5 * 60 * 1000;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Perform an immediate, one-off check
    this.checkAndStartPolling();
  }

  ngOnDestroy(): void {
    this.statusSubscription?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkAndStartPolling(): void {
    this.http
      .get(this.environment.apiPath + '/', { responseType: 'text' })
      .subscribe({
        next: () => {
          this.serverState = 'running';
          this.startPolling(this.slowInterval);
        },
        error: () => {
          this.serverState = 'wakingUp';
          this.startPolling(this.fastInterval);
        },
      });
  }

  private startPolling(intervalInMs: number): void {
    this.statusSubscription?.unsubscribe(); // Unsubscribe from any previous polling

    this.statusSubscription = interval(intervalInMs)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          this.serverState = 'wakingUp'; // Set to wakingUp just before the request
          return this.http.get(this.environment.apiPath + '/', {
            responseType: 'text',
          }).pipe(
            catchError(() => of('error')) // Catch the error to prevent stream from terminating
          );
        }),
        tap(response => {
          if (response === 'error') {
            this.serverState = 'wakingUp';
          } else {
            this.serverState = 'running';
          }
        })
      )
      .subscribe();
  }
}