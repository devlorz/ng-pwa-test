import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  template: `
    <h2 mat-dialog-title> Save Progress {{itemType}} </h2>
    <mat-dialog-content>
      Before you go, would you like to save your progress?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close> No </button>
      <button mat-button [mat-dialog-close]="true"> Yes </button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public itemType: string
  ) {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close('Some Data');
  }
}
