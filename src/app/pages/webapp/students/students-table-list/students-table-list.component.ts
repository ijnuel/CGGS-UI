import { Component } from '@angular/core';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-students-table-list',
  templateUrl: './students-table-list.component.html',
  styleUrl: './students-table-list.component.scss',
})
export class StudentsTableListComponent {
  header = tableHeader;
}
