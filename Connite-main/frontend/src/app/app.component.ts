import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from './env';
import {ChantiersApiService} from './chantiers/chantiers-api.service';
import {Chantier} from './chantiers/chantier.model';
import {Subscription} from 'rxjs/Subscription';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthApiService } from './auth/auth-api.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z10">
      <button mat-button routerLink="/">Liste de mes Chantiers</button>
      <button mat-button routerLink="/about"> En savoir plus sur nous ...</button>

      <!-- This fills the remaining space of the current row -->
      <span class="fill-remaining-space"></span>

      <button mat-button routerLink="login" *ngIf="!authenticated">Connexion</button>
      <button mat-button routerLink="register" *ngIf="!authenticated">Registration</button>
      <button mat-button (click)="signOut()" *ngIf="authenticated">Sign Out</button>
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
  constructor(private http: HttpClient,private authApi: AuthApiService){}
  
  private static _handleError(err: HttpErrorResponse | any)
  {
      return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  authentificated= this.authApi.user.isloggedIn;
  title = "frontend";


  about()
  {
      return this.http
          .get(`${API_URL}/about`)
          .pipe(catchError(AppComponent._handleError));
  }

  ngOnInit()
  {
    console.log(this.authentificated)
      const self = this;
  }
}