import { Component, OnInit } from '@angular/core';
import { UserResponseDto } from './services/api-service';
import { LocalService } from './services/local-service/local.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cggs-ui';
  authenticated : boolean = false;
  isSchoolPortal : boolean = false;
  constructor(
    private localService: LocalService,
    private toastr: ToastrService,
    private router: Router
    ) { }
  ngOnInit(): void {
    const partialLink: string = location.hash.slice(1);
    if (partialLink) {
      if (partialLink.toLocaleLowerCase().includes("errormessage=")) {
        let message = partialLink.split("=")[1].replace("/\+/g", " ");
        this.toastr.error(message, 'Error Occured!');
      }
    }
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    this.authenticated = this.localService.getCurrentUser() != undefined;
    this.isSchoolPortal = this.router.url.includes('school-portal');
  }
}
