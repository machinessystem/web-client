import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharingModule } from './../sharing/sharing.module';

import { DocComponent } from './doc/doc.component';
import { DocsComponent } from './docs/docs.component';

const routes: Routes = [
  { path: '', component: DocsComponent },
  { path: ':docId', component: DocComponent }
]

@NgModule({
  declarations: [DocComponent, DocsComponent],
  imports: [
  SharingModule,
  CommonModule,
  RouterModule.forChild(routes)
  ]
})
export class DocsModule { }
