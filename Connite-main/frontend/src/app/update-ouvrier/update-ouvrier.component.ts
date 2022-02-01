import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';




export interface DialogData {
  habillement: false;
  machine: false;
  id_ouvrier: Number;
  id_chantier : Number;
  heures: Number;
  galerie: Number;
  date: Date;
}


@Component({
  selector: 'app-update-ouvrier',
  templateUrl: './update-ouvrier.component.html',
  styleUrls: ['./update-ouvrier.component.css']
})
export class UpdateOuvrierComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateOuvrierComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
