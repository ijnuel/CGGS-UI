import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {
  @Input() loading: boolean = false;
  @Input() isSchoolPortal: boolean = false;

  logo = environment.logo;
  long_name = environment.long_name;
  short_name = environment.short_name;
  constructor(
    private router: Router) {
  }

  ngOnInit(): void {
  }
}
