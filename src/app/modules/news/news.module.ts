import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsIndexComponent } from './news-index/news-index.component';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  { path: '', component: NewsIndexComponent },
  { path: ':newsId', component: NewsComponent }
]


@NgModule({
  declarations: [NewsIndexComponent, NewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NewsModule { }
