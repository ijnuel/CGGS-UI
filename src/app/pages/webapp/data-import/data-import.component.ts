import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';
import { DataImportFacade } from '../../../store/data-import/data-import.facade';
import { ImportEntityInterface } from '../../../types';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.scss'],
})
export class DataImportComponent implements OnInit, OnDestroy {
  importEntities$: Observable<ImportEntityInterface[] | null>;
  loading$: Observable<boolean>;
  isDownloading$: Observable<boolean>;
  isImporting$: Observable<boolean>;

  selectedEntity: ImportEntityInterface | null = null;
  selectedFile: File | null = null;

  formGroup: FormGroup<{
    entityName: FormControl<string | null>;
  }>;

  get formControl() {
    return this.formGroup.controls;
  }

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private dataImportFacade: DataImportFacade,
    private toastService: ToastNotificationService
  ) {
    this.importEntities$ = this.dataImportFacade.importEntities$;
    this.loading$ = this.dataImportFacade.loading$;
    this.isDownloading$ = this.dataImportFacade.isDownloading$;
    this.isImporting$ = this.dataImportFacade.isImporting$;

    this.formGroup = this.fb.group({
      entityName: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.dataImportFacade.getImportEntities();

    this.dataImportFacade.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        if (error) {
          this.toastService.openToast(error, NotificationTypeEnums.ERROR);
        }
      });

    this.dataImportFacade.importSuccess$
      .pipe(
        filter(success => success === true),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.toastService.openToast(
          `${this.selectedEntity?.description ?? 'Data'} imported successfully`,
          NotificationTypeEnums.SUCCESS
        );
        this.selectedFile = null;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onEntitySelect(entityName: string) {
    this.importEntities$
      .pipe(first())
      .subscribe(entities => {
        this.selectedEntity = entities?.find(e => e.name === entityName) ?? null;
        this.selectedFile = null;
      });
  }

  downloadTemplate() {
    if (!this.selectedEntity) return;
    this.dataImportFacade.downloadImportTemplate(this.selectedEntity);
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  importData() {
    if (!this.selectedEntity || !this.selectedFile) return;
    this.dataImportFacade.importData(
      this.selectedEntity.value,
      this.selectedEntity.description,
      this.selectedFile
    );
  }

  getEntityLabel(entity: ImportEntityInterface): string {
    return entity.description;
  }
}
