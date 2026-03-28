import { Component, OnInit } from '@angular/core';
import CardMenuItems from './card-items';
import { SidebarItemsInterface } from '../../../types/sidebar';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  
  cards: SidebarItemsInterface[] = CardMenuItems;
  ngOnInit() {
  }
}
