import { Component, OnInit } from '@angular/core';
import { PrimesService } from './primes-api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';  



export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-primes',
  templateUrl: './primes.component.html',
  styleUrls: ['./primes.component.css']
})
export class PrimesComponent implements OnInit {

  constructor(private service: PrimesService,public dialogRef: MatDialogRef<PrimesComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }



  onSubmit(){

  }



}
