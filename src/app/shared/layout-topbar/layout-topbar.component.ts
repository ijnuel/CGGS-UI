import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { CompanyListInterface, CurrentUserInterface } from '../../types';
import { AuthFacade } from '../../store/auth/auth.facade';

@Component({
  selector: 'app-layout-topbar',
  templateUrl: './layout-topbar.component.html',
  styleUrl: './layout-topbar.component.scss',
})
export class LayoutTopbarComponent implements OnInit, OnDestroy {
  @Output() toggleSidebarEvent = new EventEmitter<{ toggle: boolean }>();

  companies: CompanyListInterface[] = [];
  currentCompanyId: string | undefined;
  currentUser : CurrentUserInterface | null = null;
  private destroyed$ = new Subject<void>();

  constructor(
    private authFacade: AuthFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authFacade.getUserCompanies(); // Dispatch action to get companies

    this.authFacade
      .getUserCompaniesSuccessAction()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((response) => {
        this.companies = response.entity || [];
        const currentCompany = this.companies.find((company) => company.isCurrent);
        this.currentCompanyId = currentCompany ? currentCompany.id : undefined;
      });

    this.authFacade
      .switchCompanySuccessAction()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.router.navigate(['app/home']);
      });

      this.authFacade.selectedCurrentUser$.subscribe(x => this.currentUser = x);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit({ toggle: true });
  }

  onCompanyChange(event: MatSelectChange) {
    const selectedCompanyId = event.value;
    this.authFacade.switchCompany(selectedCompanyId);
  }

  navigateToChangePassword() {
    this.router.navigate(['app/change-password']);
  }

  navigateToProfile() {
    // TODO: Navigate to profile page when implemented
    console.log('Navigate to profile');
  }

  logout() {
    this.authFacade.logout();
  }

  getInitials(): string {
    if (!this.currentUser) return 'U';
    const firstName = this.currentUser.firstName || '';
    const lastName = this.currentUser.lastName || '';
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    if (firstName) {
      return firstName.charAt(0).toUpperCase();
    }
    if (lastName) {
      return lastName.charAt(0).toUpperCase();
    }
    return 'U';
  }
}