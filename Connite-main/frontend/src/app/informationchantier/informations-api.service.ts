import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../env';
import {Chantier} from '../chantiers/chantier.model';


@Injectable()
export class InformationsApiService
{
    constructor(private http: HttpClient)
    {}

    getChantiers()
    {
        return this.http
            .get<Chantier[]>(`${API_URL}/chantiers`)
    }

    getChantier(id_chantier:number)
    {
        return this.http
            .get<Chantier>(`${API_URL}/chantier/${id_chantier}`)
    }


    updateChantier(chantier: Chantier): Observable<any> {
        return this.http
          .post(`${API_URL}/infos/${chantier.id}`, chantier)
    }
    

    deleteChantier(chantierId: number)
    {
        return this.http.delete(`${API_URL}/chantiers/${chantierId}`);
    }


}
