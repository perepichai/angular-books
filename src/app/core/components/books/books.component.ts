import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TableColumns } from 'src/app/shared/enum/table-columns';
import { BookEntity } from 'src/app/shared/models/book.model';
import { ActivateEditMode, ActivateViewMode, DeleteBook, GetBookById, GetBooks } from '../../store/user.actions';
import { UserState } from '../../store/user.state';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  @Select(UserState.books)
  books$!: Observable<BookEntity[]>;
  books!: BookEntity[];
  @Select(UserState.book)
  owner$!: Observable<BookEntity>;
  bookId!: number;
  isDisabled: boolean = true;
  destroy$: Subject<boolean> = new Subject<boolean>();
  columns!: TableColumns[];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.books$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((books: BookEntity[]) => {
      this.books = books});
    this.store.dispatch(new GetBooks());
    this.columns = Object.values(TableColumns);
  }

  // onEdit(): void {
  //   this.store.dispatch(new ActivateEditMode(true))
  // }
  // onView(): void {
  //   this.store.dispatch(new ActivateViewMode(true))
  // }
  // onRemove(): void {
  //   this.store.dispatch(new DeleteBook(this.bookId));
  // }
  onSelect(id: number): void {
    this.isDisabled = false;
    this.bookId = id;
  }

}
