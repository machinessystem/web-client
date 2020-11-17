import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { News } from './../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiEndPoint = `${environment.apiUrl}/news`

  constructor(private http: HttpClient, private afdb: AngularFireDatabase) { }

  getNews() {
    return this.afdb.list<News>('/news').valueChanges()
  }
}
