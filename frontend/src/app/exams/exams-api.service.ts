import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from '../env';
import {Exam} from './exam.model';

@Injectable()
export class ExamsApiService
{
    constructor(private http: HttpClient)
    {}

    private static handleError(err: HttpErrorResponse | any)
    {
        return Observable.throw(err.message || 'Error: Unable to complete request.');
    }

    // GET list of public, future events
    getExams()
    {
        return this.http
            .get<Exam[]>(`${API_URL}/exams`)
            .pipe(catchError(ExamsApiService.handleError));
    }

    saveExam(exam: Exam): Observable<any>
    {
        return this.http.post(`${API_URL}/exams`, exam);
    }

    deleteExam(examId: number)
    {
        return this.http.delete(`${API_URL}/exams/${examId}`);
    }


}
