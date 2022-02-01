import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from './env';
import { AuthApiService } from './auth/auth-api.service';
import { User } from './auth/auth.model';


@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z10">
      <button mat-button routerLink="/chantier">Liste de mes Chantiers</button>
      <button mat-button routerLink="/about"> En savoir plus sur nous ...</button>
      <span class="fill-remaining-space"></span>
      <button mat-button routerLink="" >Connexion</button>
      <button mat-button routerLink="register" >Registration</button>
      <button mat-button (click)="signout()">Sign Out</button>
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
  constructor(private http: HttpClient,private authApi: AuthApiService) {
    }
  
  // private static _handleError(err: HttpErrorResponse | any)
  // {
  //     return Observable.throw(err.message || 'Error: Unable to complete request.');
  // }


  title = "frontend";


  about()
  {
      return this.http
          .get(`${API_URL}/about`)
          // .pipe(catchError(AppComponent._handleError));
  }
  signout()
  {
  }
  ngOnInit()
  {
    this.authApi.user =new User('',0,false);
    console.log(this.authApi.user)
    const self = this;
  }
}