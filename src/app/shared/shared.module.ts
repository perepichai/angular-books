import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { TranslatePipe } from './pipes/translate.pipe';



@NgModule({
  declarations: [
    ListComponent,
    TranslatePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ListComponent
  ]
})
export class SharedModule { }
