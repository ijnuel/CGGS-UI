import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { CompanyListInterface } from '../../types';
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
}