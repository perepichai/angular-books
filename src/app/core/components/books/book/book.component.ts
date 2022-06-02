import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { ActivateEditMode, ActivateViewMode, CreateBook, EditBook, GetBookById } from 'src/app/core/store/user.actions';
import { UserState } from 'src/app/core/store/user.state';
import { Constants } from 'src/app/shared/constants/constants';
import { TableCarColumns } from 'src/app/shared/enum/table-columns';
import { CarEntity } from 'src/app/shared/models/car-entity.model';
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
  columns: string[] = [];
  FormGroup: FormGroup;
  CarsFormGroup!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  book!: BookEntity;
  car!: CarEntity;
  cars!: FormArray;
  bookId!: number;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {
      type: string,
      property: string
    }
  ) {
    this.FormGroup = this.fb.group({
      id: new FormControl(),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      pageCount: new FormControl('', [Validators.required]),
      publishDate: new FormControl('', [Validators.required]),
      // cars: this.fb.array([]),
    });
    // this.cars = this.FormGroup.get('cars') as FormArray;
  }

  ngOnInit(): void {
    this.isEditMode = this.store.selectSnapshot<boolean>(UserState.isEditMode);
    this.isViewMode = this.store.selectSnapshot<boolean>(UserState.isViewMode);

    if (this.isEditMode || this.isViewMode) {
      this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
        this.bookId = Number(this.data.property);
        this.store.dispatch(new GetBookById(this.bookId));
      });

      this.book$
        .pipe(
          filter((book: BookEntity) => !!book),
          takeUntil(this.destroy$))
        .subscribe((book: BookEntity) => {
          this.setUser(book);
        });

    }

    this.columns = Object.values(TableCarColumns);

    this.FormGroup.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((val: BookEntity) => {
      this.book = val;
    });

  }

  private setUser(user: BookEntity): void {
    // this.cars.clear();
    this.FormGroup.reset();
    this.FormGroup.patchValue(user);
    // user.cars.forEach((car: CarEntity) => {
    //   let carForm = this.newForm();
    //   carForm.patchValue(car);
    //   this.cars.push(carForm);
    // });

    if (this.isViewMode) {
      this.FormGroup.disable();
      // this.cars.disable();
    }

  }

  private newForm(): FormGroup {
    const CarsFormGroup = this.fb.group({
      id: new FormControl(),
      number: new FormControl('', [
        Validators.required,
        Validators.maxLength(Constants.MAX_LENGTH),
        Validators.pattern(Constants.NUMBER_REGEX),
      ]),
      model: new FormControl('', [Validators.required]),
      manufacturer: new FormControl('', [Validators.required]),
      productionYear: new FormControl('', [Validators.required]),
    });
    return CarsFormGroup;
  }

  onAdd(): void {
    this.cars.push(this.newForm());
  }
  onRemove(i: number): void {
    this.cars.removeAt(i);
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
    // this.cars.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }
  
}
