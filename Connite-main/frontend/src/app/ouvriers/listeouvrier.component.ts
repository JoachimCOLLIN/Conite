import {Component, OnInit} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from 'rxjs';
import {Chantier} from '../chantiers/chantier.model';
import {ChantiersApiService} from '../chantiers/chantiers-api.service';
import { Ouvrier } from './ouvrier.model';
import { OuvriersApiService } from './ouvriers-api.service';



@Component({
    selector: 'liste-ouvrier',
    template: `

    <table mat-table [dataSource]="ouvrier" class="mat-elevation-z8">

    <!--- Note that these columns can be defined in any order.
          The actual rendered columns are set as a property on the row definition" -->
  
    <!-- Position Column -->
    <!-- Name Column -->
    <ng-container matColumnDef="nom">
      <th mat-header-cell *matHeaderCellDef style="text-align:left"> Nom </th>
      <td mat-cell *matCellDef="let element" style="text-align:left"> {{element.nom}} </td>
    </ng-container>
  
    <!-- Weight Column -->
    <ng-container matColumnDef="prenom">
      <th mat-header-cell *matHeaderCellDef style="text-align:left"> Prenom </th>
      <td mat-cell *matCellDef="let element" style="text-align:left"> {{element.prenom}} </td>
    </ng-container>
  
    <ng-container matColumnDef="age">
      <th mat-header-cell *matHeaderCellDef style="text-align:left"> Age </th>
      <td mat-cell *matCellDef="let element" style="text-align:left"> {{element.age}} </td>
    </ng-container>


    <!-- Symbol Column -->
    <ng-container matColumnDef="qualification">
      <th mat-header-cell *matHeaderCellDef style="text-align:left"> Qualification </th>
      <td mat-cell *matCellDef="let element" style="text-align:left"> {{element.qualification}} </td>
    </ng-container>

    <ng-container matColumnDef="actions">
    <th mat-header-cell  *matHeaderCellDef style="text-align:center"> Actions </th>
    <td mat-cell *matCellDef="let element">
    <button mat-button (click)="delete(id,element.id)"><mat-icon align="end" >delete</mat-icon></button>
    </td>
  </ng-container>


  
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
   </table>

   <button mat-fab color="primary" 
   class="new-chantier" [routerLink] = "['/new-ouvrier',id]">
   <i class="material-icons">person_add</i>
</button>
  

`,
    styles: [`

    table {
      width: 100%;
    }

    button.new-chantier {
      position: fixed;
      bottom: 15px;
      right: 15px;
    }+
    
    button.material-icons{
      position : absolute;
      right : 3px;
      top : 3px;
    }
    
    


`]
})


export class ListeOuvrierComponent implements OnInit {

    id = 0;
    ouvriersListSubs: Subscription;
    ouvrier : Ouvrier[];
    displayedColumns: string[] = [ 'nom', 'prenom', 'age','qualification','actions'];
  


    constructor(
      private route: ActivatedRoute,
      private ouvriersApi: OuvriersApiService,
    ) {}

    delete(chantierId: number,ouvrierId : number)
    {
      console.log(chantierId)
      console.log(ouvrierId)
        this.ouvriersApi
            .deleteOuvrier(chantierId,ouvrierId)
            .subscribe(() => {
                this.ouvriersListSubs = this.ouvriersApi.getOuvriers(this.id).subscribe(
                    res => {this.ouvrier = res;}, console.error)}, console.error); 
                  }


    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.id = +this.route.snapshot.paramMap.get('id');
        console.log(this.id);
      this.ouvriersListSubs = this.ouvriersApi
          .getOuvriers(this.id)
          .subscribe(res => {this.ouvrier = res;}, console.error);
      const self = this; 

      });

      };


    }

        


