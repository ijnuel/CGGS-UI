import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PrincipalRemarkFacade } from '../../../../store/principal-remark/principal-remark.facade';
import { PrincipalRemarkListInterface } from '../../../../types';

@Component({
  selector: 'app-view-principal-remark',
  templateUrl: './view-principal-remark.component.html',
  styleUrls: ['./view-principal-remark.component.scss'],
})
export class ViewPrincipalRemarkComponent implements OnInit {
  principalRemark$: Observable<PrincipalRemarkListInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private principalRemarkFacade: PrincipalRemarkFacade,
    private router: Router
  ) {
    this.principalRemark$ = this.principalRemarkFacade.principalRemarkById$;
  }

  ngOnInit() {
    const principalRemarkId = this.route.snapshot.params['id'];
    if (principalRemarkId) {
      this.principalRemarkFacade.getPrincipalRemarkById(principalRemarkId);
    }
  }
} 