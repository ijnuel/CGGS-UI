import { Component, Input, Output, EventEmitter, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
export class SearchableMatSelectComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() options: any[] = [];
  @Input() labelSeparator: string = ' ';
  @Input() labelKeys: string[] = ['description'];
  @Input() labelFn?: (option: any) => string;
  @Input() valueKey: string = 'value';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() formInputClass: string = 'form-input';
  @Input() error: string | null = '';
  @Input() loading: boolean | null = false;
  @Input({ required: true }) formControl: FormControl<any> = new FormControl();

  @Input() set disabled(val: boolean) {
    this._disabled = val;
    val ? this.inputControl.disable() : this.inputControl.enable();
  }
  get disabled() { return this._disabled; }
  private _disabled = false;

  @Output() selectionChange = new EventEmitter<any>();

  inputControl = new FormControl('');
  filteredOptions: any[] = [];
  value: any;

  onChange = (_: any) => {};
  onTouched = () => {};

  displayFn = (option: any): string => {
    if (!option) return '';
    if (typeof option === 'string') return option;
    return this.getLabel(option);
  };

  ngOnInit() {
    this.filteredOptions = this.options;
    this.inputControl.valueChanges.subscribe(val => {
      const text = typeof val === 'string' ? val : '';
      this.filterOptions(text);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.filteredOptions = this.options;
      if (this.value != null) {
        this.syncDisplay();
      }
    }
  }

  private syncDisplay() {
    const selected = this.options?.find(o => o[this.valueKey] === this.value);
    if (selected) {
      this.inputControl.setValue(selected, { emitEvent: false });
    }
  }

  filterOptions(search: string) {
    if (!search) {
      this.filteredOptions = this.options;
    } else {
      const lower = search.toLowerCase();
      this.filteredOptions = this.options.filter(o =>
        this.labelFn
          ? this.labelFn(o).toLowerCase().includes(lower)
          : this.labelKeys.some(k => (o[k] || '').toLowerCase().includes(lower))
      );
    }
  }

  get hasValue(): boolean {
    return this.value != null && this.value !== '';
  }

  clearSelection(event: MouseEvent): void {
    event.stopPropagation();
    this.value = null;
    this.inputControl.setValue(null, { emitEvent: false });
    this.filteredOptions = this.options;
    this.onChange(null);
    this.selectionChange.emit(null);
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const option = event.option.value;
    const val = option[this.valueKey];
    this.value = val;
    this.onChange(val);
    this.selectionChange.emit(val);
  }

  onBlur() {
    const selected = this.options?.find(o => o[this.valueKey] === this.value);
    if (selected) {
      this.inputControl.setValue(selected, { emitEvent: false });
    } else {
      this.inputControl.setValue(null, { emitEvent: false });
    }
    this.filteredOptions = this.options;
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value;
    if (!value) {
      this.inputControl.setValue(null, { emitEvent: false });
    } else {
      this.syncDisplay();
    }
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
  }

  getLabel(option: any): string {
    if (this.labelFn) return this.labelFn(option);
    return this.labelKeys.map(k => option[k] ?? '').join(this.labelSeparator);
  }
}
