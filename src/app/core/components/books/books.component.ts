import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TableColumns } from 'src/app/shared/enum/table-columns';
import { BookEntity } from 'src/app/shared/models/book.model';
import { ActivateViewMode, GetBooks } from '../../store/user.actions';
import { UserState } from '../../store/user.state';
import { BookComponent } from './book/book.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
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

  constructor(private store: Store, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.books$
      .pipe(takeUntil(this.destroy$))
      .subscribe((books: BookEntity[]) => {
        this.books = books;
      });
    this.store.dispatch(new GetBooks());
    this.columns = Object.values(TableColumns);
  }

  onAdd(): void {
    const dialogRef = this.matDialog.open(BookComponent, {
      width: '1024px',
      height: '95vh',
      autoFocus: false,
      data: {
        state: 'new',
        property: '',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      this.store.dispatch(new ActivateViewMode(false));
    });
  }

  onSelect(id: number): void {
    this.isDisabled = false;
    this.bookId = id;
  }
}
