import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface
} from '../../../types';
import CardMenuItems from './card-items';
import { SidebarItemsInterface } from '../../../types/sidebar';

@Component({
    selector: 'app-settings',
    templateUrl: './admin-setup.component.html',
    styleUrl: './admin-setup.component.scss',
})
export class AdminSetupComponent implements OnInit {
  
  cards: SidebarItemsInterface[] = CardMenuItems;
  ngOnInit() {
  }
}
