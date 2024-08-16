import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.css']
})
export class AuthenticatedLayoutComponent implements OnInit {
  @Input() loading: boolean = false;
  
  ngOnInit(): void {
  }

}
