import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { ActivateEditMode, ActivateViewMode, CreateBook, EditBook, GetBookById } from 'src/app/core/store/user.actions';
import { UserState } from 'src/app/core/store/user.state';
import { BookEntity } from 'src/app/shared/models/book.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit, OnDestroy {
  @Select(UserState.book)
  book$!: Observable<BookEntity>;
  isEditMode = false;
  isViewMode = false;
  FormGroup: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  book: BookEntity = new BookEntity('','',0,'');
  bookId!: number;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {
      state: string,
      property: string
    }
  ) {
    this.FormGroup = this.fb.group({
      id: new FormControl(0),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      excerpt: new FormControl(''),
      pageCount: new FormControl(0, [Validators.required]),
      publishDate: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.isEditMode = this.store.selectSnapshot<boolean>(UserState.isEditMode);
    this.isViewMode = this.store.selectSnapshot<boolean>(UserState.isViewMode);

    if (this.isEditMode || this.isViewMode) {
      this.bookId = Number(this.data.property);
      this.store.dispatch(new GetBookById(this.bookId));

      this.book$
        .pipe(
          filter((book: BookEntity) => !!book),
          takeUntil(this.destroy$))
        .subscribe((book: BookEntity) => {
          this.setBook(book);
        });
    }

    this.FormGroup.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((val: BookEntity) => this.book = val);
  }

  private setBook(book: BookEntity): void {
    this.FormGroup.reset();
    this.FormGroup.patchValue(book);

    if (this.isViewMode) {
      this.FormGroup.disable();
    }

  }

  onSave(): void {
    this.isEditMode
      ? this.store.dispatch(new EditBook(this.book))
      : this.store.dispatch(new CreateBook(this.book));

    this.store.dispatch(new ActivateEditMode(false));
    this.store.dispatch(new ActivateViewMode(false));
  }

  onBack(): void {
    this.store.dispatch(new ActivateViewMode(false));
    this.store.dispatch(new ActivateEditMode(false));
    this.FormGroup.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }
  
}
