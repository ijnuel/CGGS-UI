import { Component, EventEmitter, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  open: boolean = false;
  dataEmitter = new EventEmitter<boolean>();

  logo = environment.logo;
  long_name = environment.long_name;
  short_name = environment.short_name;

  sendData(open:boolean) {
    open = !open;
    this.open = open;
  }
}
