import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from '../env';
import {Ouvrier} from './ouvrier.model';


@Injectable()
export class OuvriersApiService
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
            .pipe(catchError(OuvriersApiService.handleError));
    }

    saveOuvrier(ouvrier: Ouvrier): Observable<any> {
        
        return this.http
          .post(`${API_URL}/ouvriers`, ouvrier);
    }

    saveOuvrierId(ouvrier: Ouvrier, id : number): Observable<any> {
      
      return this.http
        .post(`${API_URL}/ouvriers/${id}`, ouvrier);
  }
    

    deleteOuvrier(ouvrierId: number)
    {
        return this.http.delete(`${API_URL}/ouvriers/${ouvrierId}`);
    }


}
