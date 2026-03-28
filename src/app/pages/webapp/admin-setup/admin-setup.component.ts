import { Component, OnInit } from '@angular/core';
import CardMenuItems from './card-items';
import { SidebarItemsInterface } from '../../../types/sidebar';

@Component({
    selector: 'app-admin-setup',
    templateUrl: './admin-setup.component.html',
    styleUrl: './admin-setup.component.scss',
})
export class AdminSetupComponent implements OnInit {
  
  cards: SidebarItemsInterface[] = CardMenuItems;
  ngOnInit() {
  }
}
