import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../env';
import {Ouvrier} from '../ouvriers/ouvrier.model';
import { PointageOuvrier } from './pointage.model';
@Injectable()
export class PointageApiService
{
    constructor(private http: HttpClient)
    {}


    getOuvriers()
    {
        return this.http
            .get<Ouvrier[]>(`${API_URL}/ouvriers`)
    }
    updatePointage(pointageouvrier: PointageOuvrier): Observable<any> {
        
        return this.http
          .post(`${API_URL}/pointageouvrier_update`, pointageouvrier);
    }


}
