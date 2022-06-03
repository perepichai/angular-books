import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {  Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableCarColumns, TableColumnsReverse } from 'src/app/shared/enum/table-columns';
import { BookEntity } from 'src/app/shared/models/book.model';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { BookComponent } from 'src/app/core/components/books/book/book.component';
import { ActivateEditMode, ActivateViewMode } from 'src/app/core/store/user.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnChanges {
  @Input() entities: object[] | undefined;
  @Input() columns!: string[];
  @Output() selectedRowId = new EventEmitter<number>();

  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  dataSource = new MatTableDataSource([{}]);
  tableColumnsReverse = TableColumnsReverse;
  tableColumns = TableCarColumns;
  selection = new SelectionModel<any>(false, []);

  @ViewChild(MatTable)
  table!: MatTable<BookEntity>;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  onSelect(row: { id: number }): void {
    this.selection.select(row);
    this.selectedRowId.emit(row.id);
  }
  onOpen(book: BookEntity): void {
    this.store.dispatch(new ActivateViewMode(true))
    const dialogRef = this.matDialog.open(BookComponent, {
      width: '1024px',
      height: '95vh',
      autoFocus: false,
      data: {
        type: 'id',
        property: book.id
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      this.store.dispatch(new ActivateViewMode(false))
    });
  }

  onEdit(book: BookEntity): void {
    this.store.dispatch(new ActivateEditMode(true))
    const dialogRef = this.matDialog.open(BookComponent, {
      width: '1024px',
      height: '95vh',
      autoFocus: false,
      data: {
        type: 'id',
        property: book.id
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      this.store.dispatch(new ActivateEditMode(false))
    });
  }

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private matDialog: MatDialog,
    private store: Store) {}

  ngOnInit(): void {
    this.displayedColumns = this.columns.slice();
    // this.columnsToDisplay = this.displayedColumns.slice();
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      return data.title == filter;
     };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['entities'] && changes['entities'].currentValue) {
      const entities = changes['entities'].currentValue;
      this.dataSource = new MatTableDataSource(entities);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
