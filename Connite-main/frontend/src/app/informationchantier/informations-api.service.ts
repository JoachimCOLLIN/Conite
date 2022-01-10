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
    getChantiers(id : number)
    {
        return this.http
            .get<Chantier[]>(`${API_URL}/chantiers/${id}`)
            .pipe(catchError(InformationsApiService.handleError));
    }

    saveChantier(chantier: Chantier): Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${Auth0.getAccessToken()}`
          })
        };
        return this.http
          .post(`${API_URL}/chantiers`, chantier, httpOptions);
    }
    

    deleteChantier(chantierId: number)
    {
        return this.http.delete(`${API_URL}/chantiers/${chantierId}`);
    }


}
