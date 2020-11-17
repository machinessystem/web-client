import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: 'confirm-dialog.html',
})
export class AppConfirmDialog {

    constructor(
        public dialogRef: MatDialogRef<AppConfirmDialog>,
        @Inject(MAT_DIALOG_DATA) public data: string) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
    confirm() {
        this.dialogRef.close(true);
    }
}