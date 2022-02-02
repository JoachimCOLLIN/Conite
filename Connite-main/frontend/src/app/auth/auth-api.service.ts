import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../env';
import {Auth,User} from './auth.model';


@Injectable()
export class AuthApiService
{   
    user =new User('',0,false)
    auth= new Auth('','','','','')
    constructor(private http: HttpClient)
    {}



    login(email: string, password: string): Observable<any>
    {   
        return this.http
            .post<User>(`${API_URL}/login`,{"email":email,"password":password});
    }

    register(auth: Auth): Observable<any>
    {
        return this.http
            .post(`${API_URL}/register`, auth);
    }




}
