import { Component, OnInit } from '@angular/core';
import { UserResponseDto } from './services/api-service';
import { LocalService } from './services/local-service/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cggs-ui';
  authenticated : boolean = false;
  constructor(
    private localService: LocalService
    ) { }
  ngOnInit(): void {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    this.authenticated = this.localService.getCurrentUser() != undefined;
  }
}
