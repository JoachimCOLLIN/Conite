import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from '../env';
import {Auth,User} from './auth.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthApiService
{   
    user =new User('',0,false)
    auth= new Auth('','','','','')
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    constructor(private http: HttpClient)
    {}

    // private static handleError(err: HttpErrorResponse | any)
    // {
    //     return throwError(err.message || 'Error: Unable to complete request.');
    // }

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
