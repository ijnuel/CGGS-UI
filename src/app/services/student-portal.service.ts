import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenericResponseInterface } from '../types';
import { StudentFeeSummaryInterface, StudentReceiptInterface } from '../types/fee';
import { ReportCardInterface, StudentResultsOverviewInterface } from '../types/result';
import { environment } from '../../environments/environment';

// Self-service calls for students and families. studentId can be left out for a student
// (the API uses their own record); a family passes the child they are viewing.
@Injectable({
  providedIn: 'root',
})
export class StudentPortalService {
  private readonly baseUrl = `${environment.baseUrl}/StudentPortal`;

  constructor(private http: HttpClient) {}

  getFeeSummary(studentId?: string | null): Observable<StudentFeeSummaryInterface> {
    return this.http
      .get<GenericResponseInterface<StudentFeeSummaryInterface>>(`${this.baseUrl}/GetMyFeeSummary`, this.options(studentId))
      .pipe(map((r) => r.entity));
  }

  getReceipts(studentId?: string | null): Observable<StudentReceiptInterface[]> {
    return this.http
      .get<GenericResponseInterface<StudentReceiptInterface[]>>(`${this.baseUrl}/GetMyReceipts`, this.options(studentId))
      .pipe(map((r) => r.entity ?? []));
  }

  downloadStatement(studentId?: string | null): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/GetMyStatement`, { ...this.options(studentId), responseType: 'blob' });
  }

  downloadReceipt(transactionId: string): Observable<Blob> {
    return this.http.get(`${environment.baseUrl}/Report/PaymentReceipt`, {
      params: new HttpParams().set('transactionId', transactionId),
      responseType: 'blob',
      withCredentials: true,
    });
  }

  getResults(studentId?: string | null): Observable<StudentResultsOverviewInterface> {
    return this.http
      .get<GenericResponseInterface<StudentResultsOverviewInterface>>(`${this.baseUrl}/GetMyResults`, this.options(studentId))
      .pipe(map((r) => r.entity));
  }

  getReportCard(schoolTermSessionId: string, studentId?: string | null): Observable<ReportCardInterface> {
    const { params, withCredentials } = this.options(studentId);
    return this.http
      .get<GenericResponseInterface<ReportCardInterface>>(`${this.baseUrl}/GetMyReportCard`, {
        params: params.set('schoolTermSessionId', schoolTermSessionId),
        withCredentials,
      })
      .pipe(map((r) => r.entity));
  }

  downloadResult(schoolTermSessionId: string, studentId: string): Observable<Blob> {
    return this.http.get(`${environment.baseUrl}/Result/GenerateStudentResult`, {
      params: new HttpParams()
        .set('schoolTermSessionId', schoolTermSessionId)
        .set('studentId', studentId)
        .set('hideOverallPosition', 'false'),
      responseType: 'blob',
      withCredentials: true,
    });
  }

  private options(studentId?: string | null) {
    const params = studentId ? new HttpParams().set('studentId', studentId) : new HttpParams();
    return { params, withCredentials: true };
  }
}
