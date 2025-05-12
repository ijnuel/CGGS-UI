import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutSidebarComponent } from './layout-sidebar/layout-sidebar.component';
import { LayoutTopbarComponent } from './layout-topbar/layout-topbar.component';
import { TableComponent } from './table/table.component';
import { TablePaginatorComponent } from './table-paginator/table-paginator.component';
import { GlobalLoadingComponent } from './global-loading/global-loading.component';
import { MaterialModule } from './material/material.module';
import { CommonModule } from '@angular/common';
import { TableLoaderComponent } from './table-loader/table-loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerDirective } from './loading-spinner/loading-spinner.directive';
import { CardComponent } from './card/card.component';
import { MatPaginator } from '@angular/material/paginator';

@NgModule({
  declarations: [
    LayoutSidebarComponent,
    LayoutTopbarComponent,
    TableComponent,
    CardComponent,
    TablePaginatorComponent,
    GlobalLoadingComponent,
    TableLoaderComponent,
    LoadingSpinnerDirective,
  ],
  imports: [
    RouterModule,
    MaterialModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatPaginator,
  ],
  exports: [
    LayoutSidebarComponent,
    LayoutTopbarComponent,
    TableComponent,
    CardComponent,
    TablePaginatorComponent,
    GlobalLoadingComponent,
    LoadingSpinnerDirective,
  ],
})
export class SharedModule {}
