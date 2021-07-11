import { Directive, HostListener, TemplateRef } from '@angular/core';
import { EditableTableComponent } from '../components/editable-table/editable-table.component';

@Directive({
  selector: '[viewMode]',
})
export class ViewModeDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

@Directive({
  selector: '[editMode]',
})
export class EditModeDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

@Directive({
  selector: '[editableOnEnter]',
})
export class EditableOnEnterDirective {
  constructor(private editable: EditableTableComponent) {}

  @HostListener('keyup.enter')
  onEnter() {
    this.editable.toViewMode();
  }
}
