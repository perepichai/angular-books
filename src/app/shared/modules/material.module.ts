import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  exports: [
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
  ],
})
export class MaterialModule { }
