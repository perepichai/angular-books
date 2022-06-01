import { CarEntity } from "src/app/shared/models/car-entity.model";
import { BookEntity } from "src/app/shared/models/book.model";

export class GetBooks {
  static readonly type = '[user] get all books';
  constructor() {}
}
export class GetBookById {
  static readonly type = '[user] get book';
  constructor(public id: number) {}
}

export class DeleteBook {
  static readonly type = '[user] delete book';
  constructor(public id: number) {}
}

export class CreateBook {
  static readonly type = '[user] create book';
  constructor(public book: BookEntity,

  ) {}
}

export class EditBook {
  static readonly type = '[user] edit user';
  constructor(public book: BookEntity) { }
}

export class ActivateEditMode {
  static readonly type = '[user] activate edit Mode';
  constructor(public payload: boolean) { }
}

export class ActivateViewMode {
  static readonly type = '[user] activate view Mode';
  constructor(public payload: boolean) { }
}