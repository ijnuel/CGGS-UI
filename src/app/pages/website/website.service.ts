import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface PublicCompany {
  id: string;
  name?: string;
  shortName?: string;
  description?: string;
  mission?: string;
  vision?: string;
  address?: string;
  principalName?: string;
  phoneNumber?: string;
  email?: string;
  whatsApp?: string;
  yearFounded?: number;
  facebookUrl?: string;
  instagramUrl?: string;
  logo?: string;
}

export interface PublicAnnouncement {
  id: string;
  title: string;
  body: string;
  category?: string;
  iconName?: string;
  location?: string;
  announcementDate: string;
}

export interface PublicGalleryImage {
  id: string;
  imageUrl: string;
  caption?: string;
  displayOrder: number;
}

export interface PublicCoreValue {
  id: string;
  title: string;
  body: string;
  iconName?: string;
  displayOrder: number;
}

interface ApiResponse<T> {
  entity: T;
  succeeded: boolean;
}

@Injectable()
export class WebsiteService {
  private base = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCompany(id: string): Observable<PublicCompany | null> {
    return this.http
      .get<ApiResponse<PublicCompany>>(`${this.base}/Company/GetPublic`, { params: { id } })
      .pipe(
        map(r => r.entity),
        catchError(() => of(null))
      );
  }

  getAnnouncements(companyId: string): Observable<PublicAnnouncement[]> {
    return this.http
      .get<ApiResponse<PublicAnnouncement[]>>(`${this.base}/CompanyAnnouncement/GetPublic`, { params: { companyId } })
      .pipe(
        map(r => r.entity ?? []),
        catchError(() => of([]))
      );
  }

  getGallery(companyId: string): Observable<PublicGalleryImage[]> {
    return this.http
      .get<ApiResponse<PublicGalleryImage[]>>(`${this.base}/CompanyGalleryImage/GetPublic`, { params: { companyId } })
      .pipe(
        map(r => r.entity ?? []),
        catchError(() => of([]))
      );
  }

  getCoreValues(companyId: string): Observable<PublicCoreValue[]> {
    return this.http
      .get<ApiResponse<PublicCoreValue[]>>(`${this.base}/CompanyCoreValue/GetPublic`, { params: { companyId } })
      .pipe(
        map(r => r.entity ?? []),
        catchError(() => of([]))
      );
  }
}
