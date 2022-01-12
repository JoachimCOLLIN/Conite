import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {AboutComponent} from './about.component';
import {ChantiersApiService} from './chantiers/chantiers-api.service';
import {OuvriersApiService} from './ouvriers/ouvriers-api.service';
import {InformationsApiService} from './informationchantier/informations-api.service';
import {ChantierFormComponent} from './chantiers/chantier-form.component';
import {ChantiersComponent} from './chantiers/listechantiers.component';
import {AuthApiService} from './auth/auth-api.service';
import {LoginComponent} from './auth/login.component';
import {RegisterComponent} from './auth/register.component';
import {CallbackComponent} from './callback.component';
import * as Auth0 from 'auth0-web';
import { InformationsComponent } from './informationchantier/informations.component';
import { ChantierComponent } from './chantiers/chantier.component';
import {ListeOuvrierComponent} from './chantiers/listeouvrier.component';
import { OuvrierFormComponent } from './ouvriers/ouvrier-form.component';

const appRoutes: Routes = [
    {path: '', component: ChantiersComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'new-chantier', component: ChantierFormComponent},
    {path: 'about', component: AboutComponent},
    {path: 'callback', component: CallbackComponent },
    {path: 'infos/:id', component: InformationsComponent},
    {path: 'chantier/:id',component : ChantierComponent},
    {path: 'listedesouvriers/:id', component: ListeOuvrierComponent},
    {path: 'new-ouvrier/:id', component : OuvrierFormComponent}
];


@NgModule({
  declarations: [
      AppComponent,
      ChantierFormComponent,
      ChantiersComponent,
      AboutComponent,
      LoginComponent,
      RegisterComponent,
      CallbackComponent,
      InformationsComponent,
      ChantierComponent,
      ListeOuvrierComponent,
      OuvrierFormComponent,
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes, {enableTracing: true}),
      NoopAnimationsModule,
      MatToolbarModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      MatIconModule,
      MatTableModule
  ],
    providers: [
        ChantiersApiService,
        AuthApiService,
        OuvriersApiService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        Auth0.configure({
          domain: 'dev-65v3zaee.us.auth0.com',
          audience: 'https://online-exam.digituz.com.br',
          clientID: 'TnsKt1kKB9xbKnHFJHvwE8AENEICnLDS',
          redirectUri: 'http://localhost:4200/callback',
          scope: 'openid profile manage:exams'
        });
      }
 }
