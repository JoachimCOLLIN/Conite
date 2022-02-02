import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../env';
import {Ouvrier} from './ouvrier.model';


@Injectable()
export class OuvriersApiService
{
    constructor(private http: HttpClient)
    {}


    getOuvriers(chantierId: number)
    {
        return this.http
            .get<Ouvrier[]>(`${API_URL}/ouvriers_chantier/${chantierId}`)
    }

    saveOuvrier(ouvrier: Ouvrier): Observable<any> {
        
        return this.http
          .post(`${API_URL}/ouvriers_add`, ouvrier);
    }


    deleteOuvrier(chantierId: number,ouvrierId: number)
    {
        return this.http.delete(`${API_URL}/ouvriers_delete/${ouvrierId}/${chantierId}`);
    }


}
