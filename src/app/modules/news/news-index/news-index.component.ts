import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-index',
  templateUrl: './news-index.component.html',
  styleUrls: ['./news-index.component.scss']
})
export class NewsIndexComponent implements OnInit {
  news$: Observable<News[]>;
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.news$ = this.newsService.getNews()
  }


}
