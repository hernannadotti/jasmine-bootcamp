import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalDialogComponent>) {}

  ngOnInit(): void {
  }

  cancelClick(data: any) {
    this.dialogRef.close(data);
  }

  okClick(data: any) {
    this.dialogRef.close(data);
  }

}
