import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrl: './side-nav-bar.component.css'
})
export class SideNavBarComponent implements OnInit {
  constructor(
    private router: Router,
  ) {}

  open = false;

  links = [
    {
      title: "Administrators",
      slug: "/admin/list"
    },
  ];
  xLinks: Link[] = [];

  async ngOnInit(): Promise<void> {
  }

}

interface Link {
  title: string;
  isImpata: boolean;
  icon: string;
}
