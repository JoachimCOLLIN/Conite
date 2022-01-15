import {Component} from '@angular/core';
import {OuvriersApiService} from "./ouvriers-api.service";
import {Router,ActivatedRoute} from "@angular/router";
import {OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Ouvrier } from './ouvrier.model';


@Component({
  selector: 'ouvrier-form',
  template: `
    <mat-card>
      <h2>Nouvel Ouvrier</h2>
        <mat-form-field class="full-width">
          <input matInput
                 placeholder="Nom"
                 (keyup)="updateNom($event)">
        </mat-form-field>

        <mat-form-field class="full-width">
          <input matInput
                 placeholder="Prenom"
                 (keyup)="updatePrenom($event)">
        </mat-form-field>

        <mat-form-field class="full-width">
          <input matInput
                 placeholder="Age"
                 (keyup)="updateAge($event)">
        </mat-form-field>

        <mat-form-field class="full-width">
          <input matInput
                placeholder="Qualification"
                (keyup)="updateQualification($event)">
        </mat-form-field>


        <button mat-raised-button
        color="primary"
        (click)="addOuvrier()">
          <mat-icon>person_add</mat-icon>      
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


export class OuvrierFormComponent implements OnInit{
    ouvriersListSubs : Subscription;
    ouvrier : Ouvrier;
    id : number;
    constructor(private ouvriersApi: OuvriersApiService, private router: Router, private route: ActivatedRoute)
    {this.ouvrier = new Ouvrier(0,'','',0,'')}

    updateNom(event: any)
    {
        this.ouvrier.nom = event.target.value;
    }

    updatePrenom(event: any)
    {
        this.ouvrier.prenom = event.target.value;
    }

    updateAge(event: any)
    {
        this.ouvrier.age = event.target.value;
    }

    updateQualification(event: any)
    {
        this.ouvrier.qualification = event.target.value;
    }

    addOuvrier()
    {   
        this.ouvriersApi
            .saveOuvrier(this.ouvrier)
            .subscribe(
                () => this.router.navigate(['/listedesouvriers/' + String(this.ouvrier.id_chantier)]),
                error => alert(error.message)
            );
    }
    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
          this.ouvrier.id_chantier = +this.route.snapshot.paramMap.get('id');
        const self = this; 
  
        });
}
}
