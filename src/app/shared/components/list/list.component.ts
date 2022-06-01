import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {  Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableCarColumns, TableColumnsReverse } from 'src/app/shared/enum/table-columns';
import { BookEntity } from 'src/app/shared/models/book.model';

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

  onSelect(row: { id: number }): void {
    this.selection.select(row);
    this.selectedRowId.emit(row.id);
  }

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.displayedColumns = this.columns;
    this.columnsToDisplay = this.displayedColumns.slice();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['entities'] && changes['entities'].currentValue) {
      const entities = changes['entities'].currentValue;
      this.dataSource = new MatTableDataSource(entities);
      this.dataSource.sort = this.sort;
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
