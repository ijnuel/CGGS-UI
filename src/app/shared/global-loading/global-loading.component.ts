import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-global-loading',
  templateUrl: './global-loading.component.html',
  styleUrl: './global-loading.component.scss'
})
export class GlobalLoadingComponent {
  env = environment;
}
