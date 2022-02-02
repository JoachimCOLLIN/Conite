import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { PointageApiService } from '../pointage/pointage-api.serivce';
import { PointageOuvrier } from '../pointage/pointage.model';




export interface DialogData {
  pointage: PointageOuvrier;
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
