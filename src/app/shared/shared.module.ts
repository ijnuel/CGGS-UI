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

@NgModule({
  declarations: [
    LayoutSidebarComponent,
    LayoutTopbarComponent,
    TableComponent,
    TablePaginatorComponent,
    GlobalLoadingComponent,
    TableLoaderComponent,
  ],
  imports: [RouterModule, MaterialModule, CommonModule],
  exports: [
    LayoutSidebarComponent,
    LayoutTopbarComponent,
    TableComponent,
    TablePaginatorComponent,
    GlobalLoadingComponent,
  ],
})
export class SharedModule {}
