import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from '../env';
import {Chantier} from './chantier.model';
import * as Auth0 from 'auth0-web';

@Injectable()
export class ChantiersApiService
{
    constructor(private http: HttpClient)
    {}

    // private static handleError(err: HttpErrorResponse | any)
    // {
    //     return Observable.throw(err.message || 'Error: Unable to complete request.');
    // }

    getChantiers()
    {
        return this.http
            .get<Chantier[]>(`${API_URL}/chantiers`)
            // .pipe(catchError(ChantiersApiService.handleError));
    }

    getChantier(id_chantier:number)
    {
        return this.http
            .get<Chantier>(`${API_URL}/chantier/${id_chantier}`)
            // .pipe(catchError(ChantiersApiService.handleError));
    }

    saveChantier(chantier: Chantier): Observable<any> {

        return this.http
          .post(`${API_URL}/chantiers`, chantier);
    }


    deleteChantier(chantierId: number)
    {
        return this.http.delete(`${API_URL}/chantiers/${chantierId}`);
    }


}
