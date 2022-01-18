import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from '../env';
import {Auth,User} from './auth.model';
import * as Auth0 from 'auth0-web';

@Injectable()
export class AuthApiService
{   
    user =new User('','',false)
    auth= new Auth('','','','','')
    constructor(private http: HttpClient)
    {}

    private static handleError(err: HttpErrorResponse | any)
    {
        return throwError(err.message || 'Error: Unable to complete request.');
    }

    login(auth: User): Observable<any>
    {
        return this.http
            .post(`${API_URL}/login`, auth);
    }

    register(auth: Auth): Observable<any>
    {
        return this.http
            .post(`${API_URL}/register`, auth);
    }




}
