import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs/observable/interval';
import { concat } from 'rxjs/observable/concat';
import { takeWhile, map, take, tap, ignoreElements } from 'rxjs/operators';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public password = '';
  public loadingPercent = 0;
  public queryValue = 0;
  public queryMode = 'query';
  public currentPlayback = 0;
  public startDate = moment([2017, 10, 1]);
  public minDate = moment([2017, 9, 1]);
  public maxDate = moment([2017, 11, 24]);

  constructor(private snackBar: MatSnackBar) {}

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

  openSnackbar() {
    const snackBar = this.snackBar.open('Hello world', 'Close', {
      duration: 1000,
      verticalPosition: 'top'
    });
  }

  loadingProcess(speed: number) {
    return interval(speed).pipe(map(i => i * 10), takeWhile(i => i <= 100));
  }
}
