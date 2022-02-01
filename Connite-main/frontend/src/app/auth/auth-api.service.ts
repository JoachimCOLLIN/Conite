import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../env';
<<<<<<< Updated upstream
import {Auth} from './auth.model';

@Injectable()
export class AuthApiService
{
    constructor(private http: HttpClient)
    {}

    private static handleError(err: HttpErrorResponse | any)
    {
        return throwError(err.message || 'Error: Unable to complete request.');
    }

    login(auth: Auth): Observable<any>
    {
=======
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
>>>>>>> Stashed changes
        return this.http
            .post(`${API_URL}/login`, auth)
            .pipe(catchError(AuthApiService.handleError));
    }

    register(auth: Auth): Observable<any>
    {
        return this.http
            .post(`${API_URL}/register`, auth)
            .pipe(catchError(AuthApiService.handleError));
    }


}
