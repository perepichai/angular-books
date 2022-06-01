import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/shared/constants/constants';
import { IBooksService } from 'src/app/shared/models/books.model';
import { BookEntity } from 'src/app/shared/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService implements IBooksService {
  private url: string = Constants.URL;

  constructor(private http: HttpClient) { }
  getBooks(): Observable<BookEntity[]> {
    return this.http.get<BookEntity[]>(this.url).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
  getBookById(id: number): Observable<BookEntity> {
    return this.http.get<BookEntity>(`${this.url}/${id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
  createBook(book: BookEntity): Observable<BookEntity> {

    return this.http.post<BookEntity>(this.url, book).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
    
  }
  editBook(book: BookEntity): Observable<BookEntity> {
    return this.http.put<BookEntity>(`${this.url}/${book.id}`, book).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }
  deleteBook(id: number): Observable<BookEntity[]> {
    return this.http.delete<BookEntity[]>(`${this.url}${id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
