import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap, take } from 'rxjs/operators';
import { AuthFacade } from '../store/auth/auth.facade';
import { GenericResponseInterface, UserRolesEnum } from '../types';
import { StaffAssignmentsInterface } from '../types/staff';
import { environment } from '../../environments/environment';

const NO_ASSIGNMENTS: StaffAssignmentsInterface = { staffId: '', formClasses: [], classSubjects: [] };

@Injectable({
  providedIn: 'root',
})
export class StaffAssignmentService {
  private cachedUserId: string | null = null;
  private cached$: Observable<StaffAssignmentsInterface> | null = null;

  constructor(private http: HttpClient, private authFacade: AuthFacade) {}

  // The signed-in staff member's classes and subjects, or null when the user is not staff
  // (admins are not scoped). Fails closed: if the lookup errors, staff see no classes.
  myScope$(): Observable<StaffAssignmentsInterface | null> {
    return this.authFacade.selectedCurrentUser$.pipe(
      filter((user) => !!user),
      take(1),
      switchMap((user) => (user!.userType === UserRolesEnum.Staff ? this.assignments$(user!.userId) : of(null))),
    );
  }

  private assignments$(userId: string): Observable<StaffAssignmentsInterface> {
    if (!this.cached$ || this.cachedUserId !== userId) {
      this.cachedUserId = userId;
      this.cached$ = this.http
        .get<GenericResponseInterface<StaffAssignmentsInterface>>(`${environment.baseUrl}/Staff/GetMyAssignments`, {
          withCredentials: true,
        })
        .pipe(
          map((response) => response.entity ?? NO_ASSIGNMENTS),
          catchError(() => of(NO_ASSIGNMENTS)),
          shareReplay(1),
        );
    }
    return this.cached$;
  }
}
