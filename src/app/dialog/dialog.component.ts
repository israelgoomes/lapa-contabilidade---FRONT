import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  text: string;
  subText: string;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // openDialog() {
  //   this.dialog.open(DialogComponent);
  // }


}
