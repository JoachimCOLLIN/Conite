import {Component} from '@angular/core';
import {ExamsApiService} from "./exams-api.service";
import {Router} from "@angular/router";


@Component({
  selector: 'exam-form',
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
                (click)="saveExam()">
          Enregistrer Chantier
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


export class ExamFormComponent {
    exam = {
        title: '',
        description: '',
        localisation: '',
        moderateurs: '',
        datedelancement: '',
    };

    constructor(private examsApi: ExamsApiService, private router: Router)
    {}

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
        this.examsApi
            .saveExam(this.exam)
            .subscribe(
                () => this.router.navigate(['/']),
                error => alert(error.message)
            );
    }
}
