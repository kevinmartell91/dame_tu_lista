import { Directive, TemplateRef, HostListener } from '@angular/core';
import { EditableComponent } from './editable.component';

@Directive({
    selector: '[viewMode]'
})
export class ViewModeDirective {

    constructor(public tpl: TemplateRef<any>) { }
}


@Directive({
    selector: '[editMode]'
})
export class EditModeDirective {
    constructor(public tpl: TemplateRef<any>) { }
}

@Directive({
    selector: '[editableOnEnter]'
})
export class EditableOnEnterDirective {
    constructor(private editable: EditableComponent) {
    }

    @HostListener('keyup.enter')
    onEnter() {
        this.editable.toViewMode();
    }
}