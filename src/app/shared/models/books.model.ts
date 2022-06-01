import { Observable } from "rxjs";
import { BookEntity } from "./book.model";

export interface IBooksService {
  getBooks(): Observable<BookEntity[]>;
  getBookById(id: number): Observable<BookEntity>;
  createBook(book: BookEntity): Observable<BookEntity>;
  editBook(book: BookEntity): Observable<BookEntity>;
  deleteBook(id: number): Observable<BookEntity[]>;
}
