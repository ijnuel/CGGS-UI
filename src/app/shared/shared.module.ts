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
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProgramSetupLevelPanelComponent } from './program-setup-level-panel/program-setup-level-panel.component';
import { SearchableMatSelectComponent } from './searchable-mat-select/searchable-mat-select.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    ConfirmDialogComponent,
    ProgramSetupLevelPanelComponent,
    SearchableMatSelectComponent
  ],
  imports: [
    RouterModule,
    MaterialModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatPaginator,
    MatExpansionModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    LayoutSidebarComponent,
    LayoutTopbarComponent,
    TableComponent,
    CardComponent,
    TablePaginatorComponent,
    GlobalLoadingComponent,
    LoadingSpinnerDirective,
    ConfirmDialogComponent,
    TableLoaderComponent,
    RouterModule,
    MaterialModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatPaginator,
    MatExpansionModule,
    ReactiveFormsModule,
    ProgramSetupLevelPanelComponent,
    MatCheckboxModule,
    SearchableMatSelectComponent
  ],
})
export class SharedModule {}
