import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {AppConfirmDialog } from './confirm-dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        AppConfirmDialog

    ],
    imports: [
        MatButtonModule,
        MatDialogModule,
        CommonModule,
    ],
    exports: [
        AppConfirmDialog
    ],
    entryComponents: [AppConfirmDialog]
})
export class AppConfirmDialogModule { }
