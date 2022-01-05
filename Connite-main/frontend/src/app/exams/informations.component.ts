import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from 'rxjs';
import {InformationsApiService} from './informations-api.service';
import {Exam} from './exam.model';
import {ExamsApiService} from './exams-api.service';
@Component({
    selector: 'infos',
    template: `

<mat-card>
<h2>Mon Chantier</h2>
  <mat-form-field class="full-width">
    <input matInput
           placeholder="Titre : {{exam.title}} " 
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
          (click)="saveExam()">
    Modifier Chantier
  </button>
</mat-card>


`,
    styles: [`
    .exams-form {
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
    examsListSubs: Subscription;
    exam : Exam;
    


    constructor(
      private route: ActivatedRoute,
      private examsApi: ExamsApiService,
      private router: Router,
//      private infosApi : InformationsApiService

    ) {}
    updateTitle(event: any)
    {
        this.exam.title = event.target.value;
    }
    updateDescription(event: any)
    {
        this.exam.description = event.target.value;
    }
    updateLocalisation(event: any)
    {
        this.exam.localisation = event.target.value;
    }
    updateDateDeLancement(event: any)
    {
        this.exam.datedelancement = event.target.value;
    }

    updateModerateurs(event: any)
    {
        this.exam.moderateurs = event.target.value;
    }
    
    saveExam()
    {
      console.log("test")
        this.examsApi
            .saveExam(this.exam)
            .subscribe(
                () => this.router.navigate(['/']),
                error => alert(error.message)
            );
      console.log("test")

    }


    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.id = +this.route.snapshot.paramMap.get('id')
      this.examsListSubs = this.examsApi
          .getExams()
          .subscribe(res => {this.exam = res[this.id-1];}, console.error);
//      this.examsListSubs = this.infosApi
//          .getExams(this.id)
//          .subscribe(res => {this.exam = res;}, console.error);
      const self = this; 

      });
    

      };
    }

        


