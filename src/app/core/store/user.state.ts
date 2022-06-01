import { Injectable } from '@angular/core';
import { BookEntity } from 'src/app/shared/models/book.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BookService } from '../services/books/book.service';
import { Observable, tap } from 'rxjs';
import { ActivateEditMode, ActivateViewMode, CreateBook, DeleteBook, EditBook, GetBookById, GetBooks } from './user.actions';

export interface UserStateModel {
  books: BookEntity[];
  book: BookEntity,
  isEditMode: boolean,
  isViewMode: boolean;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    books: [],
    book: {
      description: '',
      title: '',
      pageCount: 0,
      excerpt: '',
      publishDate: ''
    },
    isEditMode: false,
    isViewMode: false
  },
})
@Injectable()
export class UserState {
  @Selector()
  static books(state: UserStateModel): BookEntity[] {
    return state.books;
  }
  @Selector()
  static book(state: UserStateModel): BookEntity {
    return state.book;
  }
  @Selector()
  static isEditMode(state: UserStateModel): boolean {
    return state.isEditMode;
  }
  @Selector()
  static isViewMode(state: UserStateModel): boolean {
    return state.isViewMode;
  }

  constructor(private BookService: BookService) {}

  @Action(GetBooks)
  getBooks(
    { patchState }: StateContext<UserStateModel>,
    {}: GetBooks
  ): Observable<object> {
    return this.BookService.getBooks().pipe(
      tap((books: BookEntity[]) => {
        return patchState({ books: books });
      })
    );
  }

  @Action(GetBookById)
  getBookById(
    { patchState }: StateContext<UserStateModel>,
    { id }: GetBookById
  ): Observable<object> {
    return this.BookService.getBookById(id).pipe(
      tap((book: BookEntity) => {
        return patchState({ book: book });
      })
    );
  }

  @Action(EditBook)
  editBook(
    { patchState }: StateContext<UserStateModel>,
    { book }: EditBook
  ): Observable<object> {
    return this.BookService.editBook(book).pipe(
      tap((book: BookEntity) => {
        return patchState({ book: book });
      })
    );
  }

  @Action(CreateBook)
  createBook(
    { patchState, dispatch }: StateContext<UserStateModel>,
    { book }: CreateBook
  ): Observable<object> {
    return this.BookService
      .createBook(book)
      .pipe(
        tap((book: BookEntity) => {
          dispatch(new GetBooks());
          return patchState({ book: book });
        })
      );
  }

  @Action(DeleteBook)
  deleteBook(
    { patchState, dispatch }: StateContext<UserStateModel>,
    { id }: DeleteBook
  ): Observable<object> {
    return this.BookService.deleteBook(id).pipe(
      tap((books: BookEntity[]) => {
        dispatch(new GetBooks());
        return patchState({ books: books });
      })
    );
  }

  @Action(ActivateEditMode)
  activateEditMode({ patchState }: StateContext<UserStateModel>, { payload }: ActivateEditMode): void {
    patchState({ isEditMode: payload });
  }

  @Action(ActivateViewMode)
  activateViewMode({ patchState }: StateContext<UserStateModel>, { payload }: ActivateViewMode): void {
    patchState({ isViewMode: payload });
  }

}
