import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PrimesService } from './primes-api.service';
@Component({
  selector: 'app-primes',
  templateUrl: './primes.component.html',
  styleUrls: ['./primes.component.css']
})
export class PrimesComponent implements OnInit {

  constructor(private service: PrimesService,public dialogRef: MatDialogRef<PrimesComponent>) { }

  ngOnInit(): void {
  }



}
