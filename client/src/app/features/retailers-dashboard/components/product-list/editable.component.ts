import { Component, OnInit, Output, ContentChild, ElementRef, EventEmitter } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { ViewModeDirective, EditModeDirective, EditableOnEnterDirective } from './product-edit-in-place';
import { switchMapTo, filter, take } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";


@UntilDestroy()
@Component({
    selector: 'editable',
    template: `
      <ng-container *ngTemplateOutlet="currentView"></ng-container>
    `
})
export class EditableComponent implements OnInit {
    @Output() update = new EventEmitter();
    @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
    @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;
    

    mode: 'view' | 'edit' = 'view';

    editMode = new Subject();
    editMode$ = this.editMode.asObservable();



    constructor(private host: ElementRef) {
    }

    get currentView() {
        return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
    }

    ngOnInit() {
        this.viewModeHandler();
        this.editModeHandler();
    }

    private get element() {
        return this.host.nativeElement;
    }

    private viewModeHandler() {
        // console.log("viewModeHandler - this.element", this.element);
        fromEvent(this.element, 'click').pipe(
            untilDestroyed(this)
        ).subscribe(() => {
            // console.log("viewModeHandler - object - click")
            this.mode = 'edit';
            this.editMode.next(true);
        });
    }

    private editModeHandler() {
        const clickOutside$ = fromEvent(document, 'click').pipe(
            filter(({ target }) => this.element.contains(target) === false),
            take(1)
        )

        this.editMode$.pipe(
            switchMapTo(clickOutside$),
            untilDestroyed(this)
        ).subscribe(event => {

            console.log("editHandler",event)
            this.update.next();
            this.mode = 'view';
        });
    }

    toViewMode() {
        this.update.next();
        this.mode = 'view';
    }

}