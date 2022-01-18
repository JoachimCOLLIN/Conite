import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from '../env';
import {Ouvrier} from '../ouvriers/ouvrier.model';
import { PointageOuvrier } from './pointage.model';

@Injectable()
export class PointageApiService
{
    constructor(private http: HttpClient)
    {}

    private static handleError(err: HttpErrorResponse | any)
    {
        return Observable.throw(err.message || 'Error: Unable to complete request.');
    }

    // GET list of public, future events
    getOuvriers()
    {
        return this.http
            .get<Ouvrier[]>(`${API_URL}/ouvriers`)
            .pipe(catchError(PointageApiService.handleError));
    }
    updatePointage(pointageouvrier: PointageOuvrier): Observable<any> {
        
        return this.http
          .post(`${API_URL}/pointageouvrier_update`, pointageouvrier);
    }


}
