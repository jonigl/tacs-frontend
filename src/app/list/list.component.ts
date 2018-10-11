import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTable, MatSort, MatTableDataSource, MatDialog, _MatSortHeaderMixinBase } from '@angular/material';
import { List } from '../_models/List';
import { ListService } from '../_services/list.service';
import { first } from 'rxjs/operators';
import { EditListDialogComponent } from './edit-list-dialog/edit-list-dialog.component';
import { DeleteListDialogComponent } from './delete-list-dialog/delete-list-dialog.component';
import { NewListDialogComponent } from './new-list-dialog/new-list-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild('listTable') listTable: MatTable<Element>;
  lists: List[];
  dataSource: MatTableDataSource<List>;
  displayedColumns = ['name', 'action'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private listService: ListService, public dialog: MatDialog) { }

  ngOnInit() {
    this.listService.getAll().pipe(first()).subscribe(page => {
      this.lists = page.content;
      this.dataSource = new MatTableDataSource(this.lists);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openNewDialog(): void {
    const _this: ListComponent = this;
    const dialogRef = this.dialog.open(NewListDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(name => {
      console.log('The dialog was closed');
      if (name) {
        const list: List = new List();
        list.name = name;
        _this.dataSource.data.push(list);
        _this.listTable.renderRows();
      }
    });
  }

  openEditDialog(index, list): void {
    const dialogRef = this.dialog.open(EditListDialogComponent, {
      width: '250px',
      data: { list: list }
    });

    dialogRef.afterClosed().subscribe(name => {
      console.log('The dialog was closed');
      list.name = name;
    });
  }

  openDeleteDialog(index, list): void {
    const _this: ListComponent = this;
    const dialogRef = this.dialog.open(DeleteListDialogComponent, {
      width: '250px',
      data: { list: list }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === true) {
        _this.dataSource.data.splice(index, 1);
        _this.listTable.renderRows();
      }
    });
  }

}
