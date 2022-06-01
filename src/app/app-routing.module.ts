import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './core/components/books/book/book.component';
import { BooksComponent } from './core/components/books/books.component';

const routes: Routes = [
  { path: '', component: BooksComponent },
  {
    path: 'book/create',
    component: BookComponent,
  },
  {
    path: 'book/:id',
    component: BookComponent,
  },
  {
    path: 'book/edit/:id',
    component: BookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
