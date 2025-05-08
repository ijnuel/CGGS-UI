import {
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner.component';

@Directive({
  selector: '[appLoadingSpinner]',
})
export class LoadingSpinnerDirective {
  @Input() spinnerClassName = 'dropdown-loading';
  @Input() diameter = 20;
  @Input() set appLoadingSpinner(isLoading: boolean | null | undefined) {
    isLoading ? this.showLoadingSpinner() : this.removeLoadingSpinner();
  }

  spinnerComponent!: ComponentRef<LoadingSpinnerComponent> | null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  showLoadingSpinner() {
    this.spinnerComponent = this.viewContainerRef.createComponent(
      LoadingSpinnerComponent
    );

    this.spinnerComponent.instance.defaultStyles = false;
    this.spinnerComponent.instance.diameter = this.diameter;

    //add class to loading spinner element
    this.renderer.addClass(
      this.spinnerComponent.location.nativeElement,
      this.spinnerClassName
    );

    //style parent element of loading spinner
    this.renderer.setStyle(
      (this.spinnerComponent.location.nativeElement as HTMLElement)
        .parentElement,
      'position',
      'relative'
    );

    this.renderer.appendChild(
      this.elementRef.nativeElement,
      this.spinnerComponent.location.nativeElement
    );
  }

  removeLoadingSpinner() {
    if (!this.spinnerComponent) return;

    this.viewContainerRef.clear();
  }
}
