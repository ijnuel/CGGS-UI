import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassFacade } from '../../../../store/class/class.facade';
import { ClassFormInterface } from '../../../../types';

@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.scss'],
})
export class ViewClassComponent implements OnInit {
  class$: Observable<ClassFormInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private classFacade: ClassFacade,
    private router: Router
  ) {
    this.class$ = this.classFacade.classById$;
  }

  ngOnInit() {
    const classId = this.route.snapshot.params['id'];
    if (classId) {
      this.classFacade.getClassById(classId);
    }
  }
} 