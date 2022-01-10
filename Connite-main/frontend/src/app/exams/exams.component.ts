import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Exam} from './exam.model';
import {ExamsApiService} from './exams-api.service';
import * as Auth0 from 'auth0-web';


@Component({
  selector: 'exams',
  template: `
    <h2>Mes Chantiers</h2>
    <div class="exams">
      <mat-card class="example-card" *ngFor="let exam of examsList" class="mat-elevation-z5">
        <mat-card-content>
          <button mat-button  class="material-icons" [routerLink] = "['infos',exam.id]">
            <mat-icon  >view_headline</mat-icon>
          </button>
          <mat-card-title>{{exam.title}}</mat-card-title>
          <mat-card-subtitle>{{exam.description}}</mat-card-subtitle>
          <p></p>
          <button mat-raised-button color="accent" [routerLink] = "['chantier',exam.id]" >Accès</button>
          <button mat-button color="warn" *ngIf="isAdmin()" (click)="delete(exam.id)">Supprimer</button>
          </mat-card-content>
      </mat-card>
    </div>
    <button mat-fab color="primary" *ngIf="!authenticated"
            class="new-exam" routerLink="/new-exam">
      <i class="material-icons">note_add</i>
    </button>
    
  `,
  styleUrls: ['exams.component.css'],
})

export class ExamsComponent implements OnInit, OnDestroy
{
    examsListSubs: Subscription;
    examsList: Exam[];
    authenticated = false;

    constructor(private examsApi: ExamsApiService)
    {}


    ngOnInit()
    {
        this.examsListSubs = this.examsApi
            .getExams()
            .subscribe(res => {this.examsList = res;}, console.error);
        const self = this;
    }

    ngOnDestroy()
    {
        this.examsListSubs.unsubscribe();
    }

    delete(examId: number)
    {
        this.examsApi
            .deleteExam(examId)
            .subscribe(() => {
                this.examsListSubs = this.examsApi.getExams().subscribe(
                    res => {this.examsList = res;}, console.error)}, console.error);
    }

    isAdmin()
    {
        return true;
    }
}
