import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducer';
import { AuthEffect } from './store/auth/auth.effects';
import { AuthFacade } from './store/auth/auth.facade';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptorService } from './services/app.interceptor.service';
import { GlobalLoadingFacade } from './store/global-loading/global-loading.facade';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { StudentsFacade } from './store/students/students.facade';
import { StudentsEffect } from './store/students/students.effects';
import { SharedEffect } from './store/shared/shared.effects';
import { SharedFacade } from './store/shared/shared.facade';
import { AdministratorFacade } from './store/administrator/administrator.facade';
import { TestEntityTemplateFacade } from './store/test-entity-template/test-entity-template.facade';
import { SubjectFacade } from './store/subject/subject.facade';
import { ApplicationFacade } from './store/application/application.facade';
import { FamilyFacade } from './store/family/family.facade';
import { StateFacade } from './store/state/state.facade';
import { SessionFacade } from './store/session/session.facade';
import { LocalGovernmentAreaFacade } from './store/local-government-area/local-government-area.facade';
import { CountryFacade } from './store/country/country.facade';
import { CompanyFacade } from './store/company/company.facade';
import { StudentClassFacade } from './store/student-class/student-class.facade';
import { SchoolConfigurationFacade } from './store/school-configuration/school-configuration.facade';
import { ProgramTypeFacade } from './store/program-type/program-type.facade';
import { ClassLevelFacade } from './store/class-level/class-level.facade';
import { ClassFacade } from './store/class/class.facade';
import { StaffFacade } from './store/staff/staff.facade';
import { AdministratorEffect } from './store/administrator/administrator.effects';
import { TestEntityTemplateEffect } from './store/test-entity-template/test-entity-template.effects';
import { SubjectEffect } from './store/subject/subject.effects';
import { ApplicationEffect } from './store/application/application.effects';
import { FamilyEffect } from './store/family/family.effects';
import { StateEffect } from './store/state/state.effects';
import { SessionEffect } from './store/session/session.effects';
import { LocalGovernmentAreaEffect } from './store/local-government-area/local-government-area.effects';
import { CountryEffect } from './store/country/country.effects';
import { CompanyEffect } from './store/company/company.effects';
import { StudentClassEffect } from './store/student-class/student-class.effects';
import { SchoolConfigurationEffect } from './store/school-configuration/school-configuration.effects';
import { ProgramTypeEffect } from './store/program-type/program-type.effects';
import { ClassLevelEffect } from './store/class-level/class-level.effects';
import { ClassEffect } from './store/class/class.effects';
import { StaffEffect } from './store/staff/staff.effects';
// import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([
        AuthEffect,
        StudentsEffect,
        SharedEffect,
        AdministratorEffect,
        TestEntityTemplateEffect,
        SubjectEffect,
        ApplicationEffect,
        FamilyEffect,
        StateEffect,
        SessionEffect,
        LocalGovernmentAreaEffect,
        CountryEffect,
        CompanyEffect,
        StudentClassEffect,
        SchoolConfigurationEffect,
        ProgramTypeEffect,
        ClassLevelEffect,
        ClassEffect,
        StaffEffect,
      ]),
      HttpClientModule
    ),
    provideAnimations(),
    provideHotToastConfig(),
    provideHttpClient(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authFacade: AuthFacade) => {
        return () => {
          //get user data on load
          authFacade.getCurrentUser();
        };
      },
      multi: true,
      deps: [AuthFacade],
    },
    // STORE FACADES
    AuthFacade,
    GlobalLoadingFacade,
    StudentsFacade,
    SharedFacade,
    AdministratorFacade,
    TestEntityTemplateFacade,
    SubjectFacade,
    ApplicationFacade,
    FamilyFacade,
    StateFacade,
    SessionFacade,
    LocalGovernmentAreaFacade,
    CountryFacade,
    CompanyFacade,
    StudentClassFacade,
    SchoolConfigurationFacade,
    ProgramTypeFacade,
    ClassLevelFacade,
    ClassFacade,
    StaffFacade,
  ],
};
