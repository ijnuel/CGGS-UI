import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface
} from '../../../types';
import CardMenuItems from './card-items';
import { SidebarItemsInterface } from '../../../types/sidebar';
import { AuthFacade } from '../../../store/auth/auth.facade';

@Component({
    selector: 'app-settings',
    templateUrl: './result.component.html',
    styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit {
  
  cards: SidebarItemsInterface[] = [];
  
  constructor(
    private authFacade: AuthFacade
  ) {

  }
  ngOnInit(): void {
    this.authFacade.selectedCurrentUser$.subscribe(currentUser => 
      this.cards =  CardMenuItems
        .filter(x => x.roles.length == 0 || x.roles.includes(currentUser?.userType!))
    );
  }
}
