import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from '../env';
import {Ouvrier} from '../ouvriers/ouvrier.model';
import { MatDialogRef } from '@angular/material/dialog';
@Injectable()
export class PrimesService
{
    constructor(private http: HttpClient)
    {}




}
