import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from './env';
<<<<<<< Updated upstream
import {ExamsApiService} from './exams/exams-api.service';
import {Exam} from './exams/exam.model';
import {Subscription} from 'rxjs/Subscription';
=======
import { AuthApiService } from './auth/auth-api.service';

import { User } from './auth/auth.model';
import { Router } from '@angular/router';
>>>>>>> Stashed changes

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z10">
      <button mat-button routerLink="/">Liste de mes Chantiers</button>
      <button mat-button routerLink="/about"> En savoir plus sur nous ...</button>

      <!-- This fills the remaining space of the current row -->
      <span class="fill-remaining-space"></span>
<<<<<<< Updated upstream

      <button mat-button routerLink="login" *ngIf="!authenticated">Connexion</button>
      <button mat-button routerLink="register" *ngIf="!authenticated">Registration</button>
      <button mat-button (click)="signOut()" *ngIf="authenticated">Sign Out</button>
=======
      <button mat-button routerLink="">Connexion</button>
      <button mat-button routerLink="register" >Registration</button>
      <button mat-button (click)="signout()">Sign Out</button>
>>>>>>> Stashed changes
    </mat-toolbar>

<div style="text-align:center">
<div class="view-container">
    <router-outlet></router-outlet>
</div>
</div>

  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
<<<<<<< Updated upstream
  constructor(private http: HttpClient) {}

  private static _handleError(err: HttpErrorResponse | any)
  {
      return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  authenticated = false;
  title = "frontend";
  signOut = false;
=======
  constructor(private http: HttpClient,private router: Router) {
    }

    auth = false;
  // private static _handleError(err: HttpErrorResponse | any)
  // {
  //     return Observable.throw(err.message || 'Error: Unable to complete request.');
  // }

  title = 'frontend';

>>>>>>> Stashed changes

  about()
  {
      return this.http
          .get(`${API_URL}/about`)
<<<<<<< Updated upstream
          .pipe(catchError(AppComponent._handleError));
=======
          // .pipe(catchError(AppComponent._handleError));
  }
  signout()
  {
    localStorage.removeItem('email');
    this.router.navigate(['/'])

>>>>>>> Stashed changes
  }

  ngOnInit()
  {
<<<<<<< Updated upstream
      const self = this;
=======

>>>>>>> Stashed changes
  }
}