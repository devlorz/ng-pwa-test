import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { interval } from 'rxjs/observable/interval';
import { concat } from 'rxjs/observable/concat';
import {
  takeWhile,
  map,
  take,
  tap,
  ignoreElements,
  mergeMap,
  filter
} from 'rxjs/operators';
import * as moment from 'moment';
import {
  MatSnackBar,
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort
} from '@angular/material';
import { of } from 'rxjs/observable/of';
import { OPERATOR_INFO } from './fake-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  title = 'app';

  public password = '';
  public loadingPercent = 0;
  public queryValue = 0;
  public queryMode = 'query';
  public currentPlayback = 0;
  public startDate = moment([2017, 10, 1]);
  public minDate = moment([2017, 9, 1]);
  public maxDate = moment([2017, 11, 24]);
  public dataSource = new MatTableDataSource(OPERATOR_INFO);

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadingProcess(500).subscribe(i => {
      this.loadingPercent = i;
    });
    this.loadingProcess(250).subscribe(i => {
      this.currentPlayback = i;
    });

    concat(
      interval(2000).pipe(
        take(1),
        tap(_ => {
          this.queryMode = 'determinate';
          console.log(this.queryMode);
        }),
        ignoreElements()
      ),
      this.loadingProcess(500)
    ).subscribe(i => (this.queryValue = i));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openSnackbar() {
    const snackBar = this.snackBar.open('Hello world', 'Close', {
      duration: 1000,
      verticalPosition: 'top'
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: 'email'
    });

    dialogRef
      .afterClosed()
      .pipe(filter(r => !!r), mergeMap(_ => of('network request here')))
      .subscribe(console.log);
  }

  loadingProcess(speed: number) {
    return interval(speed).pipe(map(i => i * 10), takeWhile(i => i <= 100));
  }
}
