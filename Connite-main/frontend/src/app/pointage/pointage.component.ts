import {Component, OnInit} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from 'rxjs';
import { Ouvrier } from '../ouvriers/ouvrier.model';
import { OuvriersApiService } from '../ouvriers/ouvriers-api.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { PointageOuvrier } from './pointage.model';
import { PointageApiService } from './pointage-api.serivce';



@Component({
    selector: 'liste-ouvrier',
    template: `
    <table mat-table [dataSource]="ouvrier" class="mat-elevation-z8">

    <!--- Note that these columns can be defined in any order.
          The actual rendered columns are set as a property on the row definition" -->
  >


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
    <ng-container matColumnDef="heures">
    <th mat-header-cell  *matHeaderCellDef style="text-align:left"> Heures </th>
    
    <td mat-cell *matCellDef="let row" >
    </td>
    </ng-container>
    <ng-container matColumnDef="Galerie">
    <th mat-header-cell  *matHeaderCellDef style="text-align:left"> Galerie </th>
    <td mat-cell *matCellDef="let row" >
    </td>
  </ng-container>
  <ng-container matColumnDef="primes">
  <th mat-header-cell  *matHeaderCellDef style="text-align:left"> Primes </th>
  <td mat-cell *matCellDef="let row" >
  </td>
</ng-container>

<ng-container matColumnDef="date">
<th mat-header-cell *matHeaderCellDef></th>
<td mat-cell *matCellDef="let element">    

<mat-form-field [style.width.px]=100 floatlabel = "always">
<mat-label>{{todayDate}}</mat-label>
  <input matInput [matDatepicker] = "myDatePicker" (keyup)="updateDate($event)">
  <mat-datepicker-toggle [for] = "myDatePicker" matSuffix></mat-datepicker-toggle>
  <mat-datepicker #myDatePicker ></mat-datepicker>
</mat-form-field>
</td>

</ng-container>




  
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
   </table>


`,
    styles: [`

    table {
      width: 100%;
    }

    button.new-chantier {
      position: fixed;
      bottom: 15px;
      right: 15px;
    }
    
    button.material-icons{
      position : absolute;
      right : 3px;
      top : 3px;
    }
    
    .mat-column-date {
      white-space: unset !important;
      flex: 0 0 8% !important;
      width: 10% !important;
    }
    .mat-form-field{
      width = 100 px;
    }


`]
})


export class PointageComponent implements OnInit {

    id = 0;
    ouvriersListSubs: Subscription;
    ouvrier : Ouvrier[];
    displayedColumns: string[] = ['nom', 'prenom', 'age','qualification','heures','Galerie','primes','date'];
    myDate : Date;
    todayDate : String;
    pointageouvrier= new PointageOuvrier(0,0,new Date(),0,0,false,false)
  


    constructor(
      private route: ActivatedRoute,
      private ouvriersApi: OuvriersApiService,
      private pointageApi: PointageApiService,
      private datepipe : DatePipe,
      private router : Router,
    ) { 
      this.todayDate =this.datepipe.transform((new Date), 'MM/dd/yyyy');       }

    updateDate(event: any)
    {
        this.pointageouvrier.date=event.target.value
    }
    updateHeures(event: any)
    {
        this.pointageouvrier.heures=event.target.value
    }
    updateGaleriesHeures(event: any)
    {
        this.pointageouvrier.galerie_heures=event.target.value
    }

    updatePointage(pointageouvrier : PointageOuvrier)
    {   
        this.pointageApi
            .updatePointage(this.pointageouvrier)
            .subscribe(
                () => this.router.navigate([]),
                error => alert(error.message)
            );}

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.id = +this.route.snapshot.paramMap.get('id')
      this.ouvriersListSubs = this.ouvriersApi
          .getOuvriers(this.id)
          .subscribe(res => {this.ouvrier = res;}, console.error);
      const self = this; 

      });
    

      };
    }

        


