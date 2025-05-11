import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface
} from '../../../types';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  ngOnInit() {
  }
}
