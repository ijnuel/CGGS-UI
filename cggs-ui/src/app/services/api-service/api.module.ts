import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AccountService } from './api/account.service';
import { ClassService } from './api/class.service';
import { ClassSubjectService } from './api/classSubject.service';
import { ClassSubjectResultService } from './api/classSubjectResult.service';
import { CountryService } from './api/country.service';
import { LocalGovernmentAreaService } from './api/localGovernmentArea.service';
import { SchoolConfigurationService } from './api/schoolConfiguration.service';
import { SessionService } from './api/session.service';
import { StateService } from './api/state.service';
import { StudentService } from './api/student.service';
import { SubjectService } from './api/subject.service';
import { TeacherService } from './api/teacher.service';
import { WeatherForecastService } from './api/weatherForecast.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AccountService,
    ClassService,
    ClassSubjectService,
    ClassSubjectResultService,
    CountryService,
    LocalGovernmentAreaService,
    SchoolConfigurationService,
    SessionService,
    StateService,
    StudentService,
    SubjectService,
    TeacherService,
    WeatherForecastService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
