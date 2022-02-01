import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Chantier} from './chantier.model';
import {ChantiersApiService} from './chantiers-api.service';

@Component({
  selector: 'chantiers',
  template: `
  <div *ngIf="(auth)">
    <h2>Mes Chantiers</h2>

    <div class="chantiers">
      <mat-card class="example-card" *ngFor="let chantier of chantiersList" class="mat-elevation-z5">
        <mat-card-content>
          <button mat-button  class="material-icons" [routerLink] = "['infos',chantier.id]" >
            <mat-icon  >view_headline</mat-icon>
          </button>
          <mat-card-title>{{chantier.title}}</mat-card-title>
          <mat-card-subtitle>{{chantier.description}}</mat-card-subtitle>
          <button mat-raised-button color="accent" [routerLink] = "[chantier.id]"  >Accès</button>
          <button mat-button color="warn" (click)="delete(chantier.id)">Supprimer</button>
          </mat-card-content>
      </mat-card>
    </div>
    
    <button mat-fab color="primary" class="new-chantier" routerLink="/new-chantier">
      <i class="material-icons">note_add</i>
    </button>
  </div>
  <div *ngIf="(!auth)">
  <mat-icon class="attention">report_problem</mat-icon>
    <h2>Veuillez vous connecter d'abord!</h2>

  </div>
    
  `,
  styleUrls: ['chantiers.component.css'],
})

export class ChantiersComponent implements OnInit, OnDestroy
{
    
    chantiersListSubs: Subscription;
    chantiersList: Chantier[];
    auth = false;

    constructor(private chantiersApi: ChantiersApiService) {
      if (localStorage.getItem('email') != null){
        this.auth = true;
      }
    }



    ngOnInit()
    { 

        this.chantiersListSubs = this.chantiersApi
            .getChantiers()
            .subscribe(res => {this.chantiersList = res;}, console.error);
        console.log(localStorage.getItem('email'));
        const self = this;
    }

    ngOnDestroy()
    {
        this.chantiersListSubs.unsubscribe();
    }

    delete(chantierId: number)
    {
        this.chantiersApi
            .deleteChantier(chantierId)
            .subscribe(() => {
                this.chantiersListSubs = this.chantiersApi.getChantiers().subscribe(
                    res => {this.chantiersList = res;}, console.error)}, console.error); 
                  }


}
