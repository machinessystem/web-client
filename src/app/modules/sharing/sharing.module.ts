import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { NavBarComponent } from './navbar/navbar.component';
import { LogoComponent } from './logo/logo.component';
import { FlyoutComponent } from './fylout/flyout.component';

import { AppButton } from './button/button';
import { AppConfirmDialogModule } from './confirm-dialog/confirm-dialog-module';
import { AppUserAvatarModule, } from './user-avatar/user-avatar-module';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
  declarations: [
    BasicLayoutComponent,
    NavBarComponent,
    LogoComponent,
    FlyoutComponent,
    AppButton,

  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppConfirmDialogModule,
    AppUserAvatarModule,
    RouterModule,


    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    DragDropModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatProgressBarModule,

    NgProgressModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BasicLayoutComponent,
    NavBarComponent,
    LogoComponent,
    FlyoutComponent,
    AppButton,
    
    AppUserAvatarModule,

    MatCardModule, //Angular Material starts
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    DragDropModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatProgressBarModule,

    NgProgressModule
  ]
})
export class SharingModule { }
