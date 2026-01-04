import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownListInterface, ProgramSetupLevel, ProgramSetupLevelConfig } from '../../types';

@Component({
  selector: 'app-program-setup-level-panel',
  templateUrl: './program-setup-level-panel.component.html',
  styleUrls: ['./program-setup-level-panel.component.scss']
})
export class ProgramSetupLevelPanelComponent {
  ProgramSetupLevel = ProgramSetupLevel;
  showIcons: boolean = true;
  expandedChildPanels: Set<string> = new Set();
  expandedPanels: Set<string> = new Set();

  @Input() items: any[] = [];
  @Input() levelType!: ProgramSetupLevel;
  @Input() config!: ProgramSetupLevelConfig;
  @Input() addFormVisibleFor: string | null = null;
  @Input() visibleFormIsEdit: boolean = false;
  @Input() loading: boolean = false;
  @Input() parentItemId?: string;

  @Output() edit = new EventEmitter<{ item: any, level: ProgramSetupLevel }>();
  @Output() delete = new EventEmitter<{ item: any, level: ProgramSetupLevel }>();
  @Output() add = new EventEmitter<{ item: any, level: ProgramSetupLevel }>();
  @Output() refresh = new EventEmitter<{ item: any, level: ProgramSetupLevel }>();
  @Output() showAddForm = new EventEmitter<{ id: string, level: ProgramSetupLevel }>();
  @Output() hideAddForm = new EventEmitter<{ level: ProgramSetupLevel }>();
  @Output() submit = new EventEmitter<{ item: any, level: ProgramSetupLevel, config: ProgramSetupLevelConfig }>();
  @Output() childPanelToggle = new EventEmitter<{ parentItemId: string, isExpanded: boolean }>();

  getId(item: any): string {
    return this.config.getId ? this.config.getId(item) : item.id;
  }

  getName(item: any): string {
    return this.config.getName ? this.config.getName(item) : item.name;
  }

  onRefresh(event: { item: any, level: ProgramSetupLevel }) {
    // Emit refresh for the current level
    this.refresh.emit({ item: event.item, level: event.level });
    // If this is not the top level, bubble up to parent
    if (this.levelType !== this.config.label) {
      this.refresh.emit({ item: event.item, level: this.levelType });
    }
  }
  getDropDownOptions(key: string, item: any): DropdownListInterface[] {
    return this.config.dropDownOptions?.(this.getId(item)).find(x => x.key == key)?.dropDownListFn() ?? [];
  }

  onPanelToggle(item: any, isExpanded: boolean) {
    this.showIcons = !isExpanded;
    
    const itemId = this.getId(item);
    const hadExpandedPanels = this.expandedPanels.size > 0;
    
    if (isExpanded) {
      this.expandedPanels.add(itemId);
    } else {
      this.expandedPanels.delete(itemId);
    }
    
    const hasExpandedPanels = this.expandedPanels.size > 0;
    
    // If expansion state changed and we have a parent, notify parent
    if (this.parentItemId && hadExpandedPanels !== hasExpandedPanels) {
      this.childPanelToggle.emit({ parentItemId: this.parentItemId, isExpanded: hasExpandedPanels });
    }
  }

  onChildPanelToggle(parentItemId: string, isExpanded: boolean) {
    // Track the state before updating
    const hadThisChildExpanded = this.expandedChildPanels.has(parentItemId);
    const hadAnyExpandedChildPanels = this.expandedChildPanels.size > 0;
    
    // Only update if the state actually changed (prevents duplicate processing)
    if (hadThisChildExpanded === isExpanded) {
      return; // No change, nothing to do
    }
    
    // Update the tracking for this specific child
    if (isExpanded) {
      this.expandedChildPanels.add(parentItemId);
    } else {
      this.expandedChildPanels.delete(parentItemId);
    }
    
    // Check the state after updating
    const hasAnyExpandedChildPanels = this.expandedChildPanels.size > 0;
    
    // Only notify our immediate parent if our overall child expansion state changed
    // This means we went from having some expanded children to having none, or vice versa
    // We don't emit if a child collapsed but we still have other expanded children
    // This prevents chain reactions where all grandparents get updated unnecessarily
    if (this.parentItemId && hadAnyExpandedChildPanels !== hasAnyExpandedChildPanels) {
      this.childPanelToggle.emit({ parentItemId: this.parentItemId, isExpanded: hasAnyExpandedChildPanels });
    }
  }
  
  hasExpandedChildPanel(item: any): boolean {
    const itemId = this.getId(item);
    return this.expandedChildPanels.has(itemId);
  }

  getFormControl(key: string): FormControl {
    return this.config.formGroup?.get(key) as FormControl;
  }

} 