import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteComponent } from './website.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
  },
];

@NgModule({
  declarations: [WebsiteComponent],
  imports: [RouterModule.forChild(routes)],
})
export class WebsiteModule {}
