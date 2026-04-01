import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AdministratorFacade } from '../../../../store/administrator/administrator.facade';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';
import { ProfileImageFacade } from '../../../../store/profile-image/profile-image.facade';
import { RoleFacade } from '../../../../store/role/role.facade';
import { AdministratorListInterface, DropdownListInterface, RoleWithPermissionsInterface } from '../../../../types';
import { RoleDialogComponent, RoleDialogData } from '../../../../shared/role-dialog/role-dialog.component';

@Component({
  selector: 'app-view-administrator',
  templateUrl: './view-administrator.component.html',
  styleUrls: ['./view-administrator.component.scss'],
})
export class ViewAdministratorComponent implements OnInit, OnDestroy {
  administrator$: Observable<AdministratorListInterface | null>;
  genderList$: Observable<DropdownListInterface[] | null>;
  religionList$: Observable<DropdownListInterface[] | null>;
  loading$: Observable<boolean>;

  photoUrl: string | null = null;
  photoUploading = false;
  photoDeleting = false;
  entityInitials = 'U';
  userRoles: RoleWithPermissionsInterface[] = [];
  rolesLoading = true;

  private administratorId = '';
  private userId = '';
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private administratorFacade: AdministratorFacade,
    private sharedFacade: SharedFacade,
    private globalLoadingFacade: GlobalLoadingFacade,
    private profileImageFacade: ProfileImageFacade,
    private roleFacade: RoleFacade,
  ) {
    this.administrator$ = this.administratorFacade.administratorByProperties$.pipe(
      map(admins => admins?.[0] ?? null)
    );
    this.genderList$ = this.sharedFacade.selectGenderList$;
    this.religionList$ = this.sharedFacade.selectReligionList$;
    this.loading$ = this.administratorFacade.loading$;
  }

  ngOnInit() {
    this.administratorId = this.route.snapshot.params['id'];
    if (this.administratorId) {
      this.profileImageFacade.loadCachedPhotoUrl(this.administratorId);
      this.profileImageFacade.getPhotoUrl$(this.administratorId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(url => this.photoUrl = url);

      this.administratorFacade.getAdministratorByProperties({
        queryProperties: [{ name: 'id', value: this.administratorId }],
        nestedProperties: [
          { name: 'administratorCompanies', innerNestedProperties: [{ name: 'company' }] },
          { name: 'residentialState' },
          { name: 'nationality' },
          { name: 'stateOfOrigin' },
          { name: 'originLGA' }
        ]
      });
    }

    this.administrator$.pipe(takeUntil(this.unsubscribe$)).subscribe(admin => {
      if (admin) {
        this.entityInitials = `${admin.firstName?.charAt(0) ?? ''}${admin.lastName?.charAt(0) ?? ''}`.toUpperCase() || 'U';
        if (admin.userId) {
          this.userId = admin.userId;
          this.loadUserRoles();
        }
      }
    });

    this.profileImageFacade.uploading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(uploading => this.photoUploading = uploading);

    this.profileImageFacade.deleting$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(deleting => this.photoDeleting = deleting);

    this.sharedFacade.getGenderList();
    this.sharedFacade.getReligionList();
  }

  deletePhoto() {
    if (!this.administratorId) return;
    this.profileImageFacade.deleteProfileImage('Administrator', this.administratorId);
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.administratorId) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      this.globalLoadingFacade.globalErrorShow('Only JPEG, PNG, or WebP images are allowed', 3000);
      input.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.globalLoadingFacade.globalErrorShow('Image must be smaller than 5MB', 3000);
      input.value = '';
      return;
    }

    this.profileImageFacade.uploadProfileImage('Administrator', this.administratorId, file);
    input.value = '';
  }

  getLabel(list: DropdownListInterface[] | null, value: number | undefined): string {
    if (value === undefined || value === null) return '—';
    return list?.find(item => +item.value === value)?.name ?? '—';
  }

  goBack(): void { this.location.back(); }

  navigateToEdit() {
    this.router.navigate(['/app/administrator/edit', this.administratorId]);
  }

  loadUserRoles() {
    if (!this.userId) return;
    this.rolesLoading = true;
    this.roleFacade.getRoleAll();
    this.roleFacade.getUserRoles(this.userId);

    combineLatest([this.roleFacade.roleAll$, this.roleFacade.userRoles$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([allRoles, userRoleNames]) => {
        if (allRoles && userRoleNames) {
          const nameSet = new Set(userRoleNames);
          this.userRoles = allRoles.filter(r => nameSet.has(r.name));
          this.rolesLoading = false;
        }
      });
  }

  openAssignRoleDialog() {
    this.administrator$.pipe(takeUntil(this.unsubscribe$)).subscribe(admin => {
      if (!admin) return;
      const dialogRef = this.dialog.open(RoleDialogComponent, {
        width: '440px',
        data: {
          title: 'Assign Role',
          userName: `${admin.firstName} ${admin.lastName}`,
          userId: this.userId,
          mode: 'assign',
        } as RoleDialogData,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.roleFacade.assignRole(result);
          setTimeout(() => this.loadUserRoles(), 1000);
        }
      });
    }).unsubscribe();
  }

  openRemoveRoleDialog() {
    this.administrator$.pipe(takeUntil(this.unsubscribe$)).subscribe(admin => {
      if (!admin) return;
      const dialogRef = this.dialog.open(RoleDialogComponent, {
        width: '440px',
        data: {
          title: 'Remove Role',
          userName: `${admin.firstName} ${admin.lastName}`,
          userId: this.userId,
          mode: 'remove',
        } as RoleDialogData,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.roleFacade.removeRole(result);
          setTimeout(() => this.loadUserRoles(), 1000);
        }
      });
    }).unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
