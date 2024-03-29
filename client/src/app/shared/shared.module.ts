// https://medium.com/better-programming/angular-4-shared-modules-18ac50f24852
// import { MdlModule } from '@angular-mdl/core';
import { CommonModule } from '@angular/common';
// services
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
// rows and col
import { FlexLayoutModule } from '@angular/flex-layout';
// forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// importing angular material components
// import { A11yModule } from '@angular/cdk/a11y';
// import { ClipboardModule } from '@angular/cdk/clipboard';
// import { DragDropModule } from '@angular/cdk/drag-drop';
// import { PortalModule } from '@angular/cdk/portal';
// import { ScrollingModule } from '@angular/cdk/scrolling';
// import { CdkStepperModule } from '@angular/cdk/stepper';
// import { CdkTableModule } from '@angular/cdk/table';
// import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
// import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
// import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
// import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
// import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatSortModule } from '@angular/material/sort';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatTreeModule } from '@angular/material/tree';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { AddToppingsComponent } from './components/add-toppings/add-toppings.component';
import { EditableTableComponent } from './components/editable-table/editable-table.component';
// import 'hammerjs';
import { ModalComponent } from './components/modal/modal.component';
import { ProductDisplaySharedComponent } from './components/product-display/product-display.component';
import { ShowProductDescriptionComponent } from './components/show-product-description/show-product-description.component';
import { ToppingComponent } from './components/topping/topping.component';
import {
  EditableOnEnterDirective,
  EditModeDirective,
  ViewModeDirective,
} from './directives/edit-in-place';

const EXPORTED_DECLARATIONS = [
  // ClipboardModule,
  // CdkStepperModule,
  // CdkTableModule,
  // CdkTreeModule,
  // DragDropModule,
  MatAutocompleteModule,
  MatBadgeModule,
  // MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  // MatStepperModule,
  // MatDatepickerModule,
  MatDialogModule,
  // MatDividerModule,
  MatExpansionModule,
  // MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  // MatNativeDateModule,
  // MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  // MatRadioModule,
  // MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  // MatSortModule,
  // MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  // MatTooltipModule,
  // MatTreeModule,
  // PortalModule,
  // ScrollingModule,
  // MdlModule,
];

@NgModule({
  declarations: [
    ModalComponent,
    AddButtonComponent,
    ProductDisplaySharedComponent,
    ViewModeDirective,
    EditModeDirective,
    EditableOnEnterDirective,
    EditableTableComponent,
    AddToppingsComponent,
    ToppingComponent,
    ShowProductDescriptionComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    ...EXPORTED_DECLARATIONS,
  ],
  exports: [
    CommonModule,
    ModalComponent,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AddButtonComponent,
    ProductDisplaySharedComponent,
    ViewModeDirective,
    EditModeDirective,
    EditableOnEnterDirective,
    EditableTableComponent,
    AddToppingsComponent,
    ToppingComponent,
    ShowProductDescriptionComponent,
    ...EXPORTED_DECLARATIONS,
  ],
  providers: [],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
