import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from 'rxjs';
import {InformationsApiService} from './informations-api.service';
import {Chantier} from './chantier.model';
import {ChantiersApiService} from './chantiers-api.service';
@Component({
    selector: 'infos',
    template: `

<mat-card>
<h2>Mon Chantier</h2>
  <mat-form-field class="full-width">
    <input matInput
           placeholder="Titre : {{chantier.title}} " 
           (keyup)="updateTitle($event)">
  </mat-form-field>

  <mat-form-field class="full-width">
    <input matInput
           placeholder="Description : "
           (keyup)="updateDescription($event)">
  </mat-form-field>

  <mat-form-field class="full-width">
    <input matInput
           placeholder="Localisaiton : "
           (keyup)="updateLocalisation($event)">
  </mat-form-field>

  <mat-form-field class="full-width">
    <input matInput
          placeholder="Date de lancement : "
          (keyup)="updateDateDeLancement($event)">
  </mat-form-field>

  <mat-form-field class="full-width">
    <input matInput
          placeholder="Moderateurs : "
          (keyup)="updateModerateurs($event)">
  </mat-form-field>


  <button mat-raised-button
          color="primary"
          (click)="updateChantier()">
    Modifier Chantier
  </button>
</mat-card>


`,
    styles: [`
    .chantiers-form {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .full-width {
      width: 100%;
    }
`]
})


export class InformationsComponent implements OnInit {

    id = 0;
    chantiersListSubs: Subscription;
    chantier : Chantier;
    


    constructor(
      private route: ActivatedRoute,
      private chantiersApi: ChantiersApiService,
      private router: Router,
//      private infosApi : InformationsApiService

    ) {}
    updateTitle(event: any)
    {
        this.chantier.title = event.target.value;
    }
    updateDescription(event: any)
    {
        this.chantier.description = event.target.value;
    }
    updateLocalisation(event: any)
    {
        this.chantier.localisation = event.target.value;
    }
    updateDateDeLancement(event: any)
    {
        this.chantier.datedelancement = event.target.value;
    }

    updateModerateurs(event: any)
    {
        this.chantier.moderateurs = event.target.value;
    }
    
    updateChantier()
    {
      console.log("test")
        this.chantiersApi
            .saveChantier(this.chantier)
            .subscribe(
                () => this.router.navigate(['/']),
                error => alert(error.message)
            );
      console.log("test")

    }


    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.id = +this.route.snapshot.paramMap.get('id')
      this.chantiersListSubs = this.chantiersApi
          .getChantiers()
          .subscribe(res => {this.chantier = res[this.id-1];}, console.error);
//      this.chantiersListSubs = this.infosApi
//          .getChantiers(this.id)
//          .subscribe(res => {this.chantier = res;}, console.error);
      const self = this; 

      });
    

      };
    }

        


