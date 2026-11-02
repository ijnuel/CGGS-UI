import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenericResponseInterface, PaginatedResponseInterface } from '../types';
import { environment } from '../../environments/environment';

export interface AuditActivityInterface {
  id: number;
  timestamp: string;
  requestId: string;
  userId: string | null;
  userName: string | null;
  userType: number | null;
  impersonatorUserId: string | null;
  impersonatorName: string | null;
  method: string;
  path: string;
  queryString: string | null;
  endpoint: string | null;
  statusCode: number;
  durationMs: number;
  outcome: 'Success' | 'ClientError' | 'Unauthenticated' | 'Denied' | 'ServerError';
  eventType: string | null;
  eventDetails: string | null;
  errorMessage: string | null;
  ipAddress: string | null;
  forwardedFor: string | null;
  userAgent: string | null;
  browser: string | null;
  operatingSystem: string | null;
  deviceType: string | null;
  origin: string | null;
  dataChangeCount: number;
}

export interface AuditDataChangeInterface {
  id: number;
  timestamp: string;
  requestId: string | null;
  userId: string | null;
  userName: string | null;
  impersonatorUserId: string | null;
  impersonatorName: string | null;
  entityName: string;
  entityId: string;
  action: 'Created' | 'Updated' | 'Deleted' | 'Restored';
  changes: { field: string; old: string | null; new: string | null }[];
}

export interface AuditRequestDetailInterface {
  request: AuditActivityInterface;
  dataChanges: AuditDataChangeInterface[];
}

export type AuditFilter = Record<string, string | number | boolean | null | undefined>;

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  private readonly baseUrl = `${environment.baseUrl}/Audit`;

  constructor(private http: HttpClient) {}

  getActivity(filter: AuditFilter): Observable<PaginatedResponseInterface<AuditActivityInterface[]>> {
    return this.get('GetActivity', filter);
  }

  getDataChanges(filter: AuditFilter): Observable<PaginatedResponseInterface<AuditDataChangeInterface[]>> {
    return this.get('GetDataChanges', filter);
  }

  getRequest(requestId: string): Observable<AuditRequestDetailInterface> {
    return this.get('GetRequest', { requestId });
  }

  getEntityNames(): Observable<string[]> {
    return this.get('GetEntityNames', {});
  }

  private get<T>(action: string, filter: AuditFilter): Observable<T> {
    let params = new HttpParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') params = params.set(key, String(value));
    });
    return this.http
      .get<GenericResponseInterface<T>>(`${this.baseUrl}/${action}`, { params, withCredentials: true })
      .pipe(map((r) => r.entity));
  }
}
