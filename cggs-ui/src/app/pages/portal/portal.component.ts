import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css'
})
export class PortalComponent implements OnInit {

  
  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const message: string = location.hash.slice(1);
    if (message) {
      this.toastr.error(message.replace(/\+/g, " "), 'Error Occured!');
    }
  }

}
