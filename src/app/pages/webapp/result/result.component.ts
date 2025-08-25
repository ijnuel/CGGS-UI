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
    templateUrl: './result.component.html',
    styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit {
  
  cards: SidebarItemsInterface[] = CardMenuItems;
  ngOnInit() {
  }
}
