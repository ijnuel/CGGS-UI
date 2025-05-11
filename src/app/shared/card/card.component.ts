import { Component, Input } from '@angular/core';
import { SidebarItemsInterface } from '../../types/sidebar';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() cards: SidebarItemsInterface[] = [];
}
