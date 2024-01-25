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
      name: "home",
      title: "Dashboard",
      slug: "/",
      icon: "grid_view",
    },
    {
      name: "biodata",
      title: "Student Data",
      slug: "/bio-data",
      icon: "contact_page",
    },
    {
      name: "payment",
      title: "Payments",
      slug: "/payments",
      icon: "credit_card",
    },
    {
      name: "result",
      title: "Results",
      slug: "/results",
      icon: "fact_check",
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
