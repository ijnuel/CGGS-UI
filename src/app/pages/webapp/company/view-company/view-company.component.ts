import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyFacade } from '../../../../store/company/company.facade';
import { CompanyListInterface } from '../../../../types';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.scss'],
})
export class ViewCompanyComponent implements OnInit {
    company$: Observable<CompanyListInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private companyFacade: CompanyFacade,
    private router: Router
  ) {
    this.company$ = this.companyFacade.companyById$;
  }

  ngOnInit() {
    const companyId = this.route.snapshot.params['id'];
    if (companyId) {
      this.companyFacade.getCompanyById(companyId);
    }
  }
} 