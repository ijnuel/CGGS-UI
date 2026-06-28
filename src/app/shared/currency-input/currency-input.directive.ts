import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Directive({ selector: 'input[appCurrencyInput]' })
export class CurrencyInputDirective implements OnInit, OnDestroy {
  private sub: Subscription | null = null;

  constructor(
    private el: ElementRef<HTMLInputElement>,
    @Optional() @Self() private ngControl: NgControl,
  ) {}

  ngOnInit(): void {
    this.el.nativeElement.type = 'text';

    // Defer past MatInput.writeValue() which runs synchronously in ngOnChanges
    Promise.resolve().then(() => {
      const n = this.controlValue;
      if (n != null) this.el.nativeElement.value = this.formatBlur(n);
    });

    // Re-apply blur format when value changes externally (e.g. patchValue)
    if (this.ngControl?.control) {
      this.sub = this.ngControl.control.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe(val => {
          if (document.activeElement !== this.el.nativeElement && val != null && !isNaN(+val)) {
            this.el.nativeElement.value = this.formatBlur(+val);
          }
        });
    }
  }

  @HostListener('focus')
  onFocus(): void {
    const n = this.controlValue;
    // Show typing format on focus (commas in integers, no forced decimal zeros)
    this.el.nativeElement.value = n != null ? this.formatTyping(String(n)) : '';
    this.el.nativeElement.select();
  }

  @HostListener('blur')
  onBlur(): void {
    const stripped = this.el.nativeElement.value.replace(/[^0-9.]/g, '');
    const raw = parseFloat(stripped);
    if (!isNaN(raw)) {
      this.el.nativeElement.value = this.formatBlur(raw);
      // emitModelToViewChange: false → MatInput.writeValue() is NOT triggered,
      // so our comma-formatted display is preserved
      this.ngControl?.control?.setValue(raw, { emitModelToViewChange: false });
    } else {
      this.el.nativeElement.value = '';
      this.ngControl?.control?.setValue(null, { emitModelToViewChange: false });
    }
  }

  @HostListener('input')
  onInput(): void {
    const input = this.el.nativeElement;
    const raw = input.value;
    const cursorPos = input.selectionStart ?? raw.length;

    // Count non-comma characters before the cursor — these are the user's
    // intended characters; commas are just formatting separators
    const charsBeforeCursor = raw.slice(0, cursorPos).replace(/,/g, '').length;

    const stripped = raw.replace(/,/g, '');
    const formatted = this.formatTyping(stripped);

    if (formatted !== raw) {
      input.value = formatted;

      // Restore cursor: advance through the formatted string until we've passed
      // the same number of non-comma characters that were before the old cursor
      let newPos = charsBeforeCursor === 0 ? 0 : formatted.length;
      if (charsBeforeCursor > 0) {
        let count = 0;
        for (let i = 0; i < formatted.length; i++) {
          if (formatted[i] !== ',') count++;
          if (count === charsBeforeCursor) { newPos = i + 1; break; }
        }
      }
      input.setSelectionRange(newPos, newPos);
    }

    const n = parseFloat(stripped);
    this.ngControl?.control?.setValue(
      isNaN(n) ? null : n,
      { emitModelToViewChange: false, emitEvent: true },
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private get controlValue(): number | null {
    const v = this.ngControl?.control?.value;
    if (v == null || v === '') return null;
    const n = parseFloat(String(v).replace(/,/g, ''));
    return isNaN(n) ? null : n;
  }

  // While typing: commas in integer part, decimal preserved as typed
  private formatTyping(stripped: string): string {
    if (!stripped) return '';

    const dotIdx = stripped.indexOf('.');
    const hasDot = dotIdx !== -1;
    const intStr = hasDot ? stripped.slice(0, dotIdx) : stripped;
    const decStr = hasDot ? stripped.slice(dotIdx + 1) : '';

    // If no integer part yet (e.g. user typed ".5"), don't add a leading zero
    if (!intStr) return stripped;

    const intNum = parseInt(intStr, 10);
    const intFormatted = isNaN(intNum)
      ? intStr
      : new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(intNum);

    return hasDot ? `${intFormatted}.${decStr}` : intFormatted;
  }

  // After blur: always show 2 decimal places
  private formatBlur(n: number): string {
    return new Intl.NumberFormat('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  }
}
