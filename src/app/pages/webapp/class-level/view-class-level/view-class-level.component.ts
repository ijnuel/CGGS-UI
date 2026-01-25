import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassLevelFacade } from '../../../../store/class-level/class-level.facade';
import { ClassLevelListInterface } from '../../../../types';

@Component({
  selector: 'app-view-class-level',
  templateUrl: './view-class-level.component.html',
  styleUrls: ['./view-class-level.component.scss'],
})
export class ViewClassLevelComponent implements OnInit {
    classLevel$: Observable<ClassLevelListInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private classLevelFacade: ClassLevelFacade,
    private router: Router
  ) {
    this.classLevel$ = this.classLevelFacade.classLevelById$;
  }

  ngOnInit() {
    const classLevelId = this.route.snapshot.params['id'];
    if (classLevelId) {
      this.classLevelFacade.getClassLevelById(classLevelId);
    }
  }
} 