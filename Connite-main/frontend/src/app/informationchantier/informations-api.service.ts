import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from '../env';
import {Chantier} from '../chantiers/chantier.model';
import * as Auth0 from 'auth0-web';
import { strictEqual } from 'assert';
import { stringify } from 'querystring';

@Injectable()
export class InformationsApiService
{
    constructor(private http: HttpClient)
    {}

    private static handleError(err: HttpErrorResponse | any)
    {
        return Observable.throw(err.message || 'Error: Unable to complete request.');
    }

    // GET list of public, future events
    getChantiers()
    {
        return this.http
            .get<Chantier[]>(`${API_URL}/chantiers`)
            .pipe(catchError(InformationsApiService.handleError));
    }


    updateChantier(chantier: Chantier): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${Auth0.getAccessToken()}`
        })
      };
        return this.http
          .post(`${API_URL}/infos/${chantier.id}`, chantier)
          .pipe(catchError(InformationsApiService.handleError))
    }
    

    deleteChantier(chantierId: number)
    {
        return this.http.delete(`${API_URL}/chantiers/${chantierId}`);
    }


}
