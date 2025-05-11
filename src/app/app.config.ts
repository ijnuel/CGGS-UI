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
import { TeacherFacade } from './store/teacher/teacher.facade';
import { AdministratorEffect } from './store/administrator/administrator.effects';
import { TestEntityTemplateEffect } from './store/test-entity-template/test-entity-template.effects';
import { TeacherEffect } from './store/teacher/teacher.effects';
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
        TeacherEffect,
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
          // authFacade.getCurrentUser();
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
    TeacherFacade,
  ],
};
