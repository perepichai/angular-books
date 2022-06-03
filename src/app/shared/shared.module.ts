import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { MatTableExporterModule } from 'mat-table-exporter';



@NgModule({
  declarations: [
    ListComponent,
    TranslatePipe,
    ModalWindowComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableExporterModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ListComponent
  ]
})
export class SharedModule { }
