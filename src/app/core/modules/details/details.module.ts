import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookComponent } from '../../components/books/book/book.component';



@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    MaterialModule,
    RouterModule
  ]
})
export class DetailsModule { }
