import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownListInterface } from '../../types';

@Component({
  selector: 'app-searchable-mat-select',
  templateUrl: './searchable-mat-select.component.html',
  styleUrls: ['./searchable-mat-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableMatSelectComponent),
      multi: true
    }
  ]
})
export class SearchableMatSelectComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() labelKey: string = 'description';
  @Input() valueKey: string = 'value';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() formInputClass: string = 'form-input';
  @Input() error: string | null = '';
  @Input() loading: boolean | null = false;
  @Input({ required: true }) formControl: FormControl<any> = new FormControl();

  @Output() selectionChange = new EventEmitter<any>();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  searchText: string = '';
  filteredOptions: any[] = [];
  value: any;

  onChange = (_: any) => {};
  onTouched = () => {};

  ngOnInit() {
    this.filteredOptions = this.options;
  }

  ngOnChanges() {
    this.filterOptions();
  }

  filterOptions() {
    if (!this.searchText) {
      this.filteredOptions = this.options;
    } else {
      const search = this.searchText.toLowerCase();
      this.filteredOptions = this.options.filter(opt =>
        (opt[this.labelKey] || '').toLowerCase().includes(search)
      );
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(val: any) {
    this.value = val;
    this.onChange(val);
    this.selectionChange.emit(val);
  }

  onDropdownOpened(opened: boolean) {
    if (opened) {
      setTimeout(() => {
        this.searchInput?.nativeElement.focus();
      });
    }
  }
}
