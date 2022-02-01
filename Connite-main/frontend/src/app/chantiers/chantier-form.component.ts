import {Component} from '@angular/core';
import {ChantiersApiService} from "./chantiers-api.service";
import {Router} from "@angular/router";
import { Chantier } from './chantier.model';



@Component({
  selector: 'chantier-form',
  template: `
    <mat-card>
      <h2>Nouveau Chantier</h2>
        <mat-form-field class="full-width">
          <input matInput
                 placeholder="Titre"
                 (keyup)="updateTitle($event)">
        </mat-form-field>

        <mat-form-field class="full-width">
          <input matInput
                 placeholder="Description"
                 (keyup)="updateDescription($event)">
        </mat-form-field>

        <mat-form-field class="full-width">
          <input matInput
                 placeholder="Localisation"
                 (keyup)="updateLocalisation($event)">
        </mat-form-field>

        <mat-form-field class="full-width">
          <input matInput
                placeholder="Date de lancement"
                (keyup)="updateDateDeLancement($event)">
        </mat-form-field>

        <mat-form-field class="full-width">
          <input matInput
                placeholder="Moderateurs"
                (keyup)="updateModerateurs($event)">
        </mat-form-field>


        <button mat-raised-button
                color="primary"
                (click)="saveChantier()">
          Enregistrer Chantier
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


export class ChantierFormComponent {
    chantier : Chantier;

    constructor(private chantiersApi: ChantiersApiService, private router: Router)
    {this.chantier = new Chantier("","","","","");}

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

    saveChantier()
    {
        this.chantiersApi
            .saveChantier(this.chantier)
            .subscribe(
                () => this.router.navigate(['/chantier']),
                error => alert(error.message)
            );
    }
}
