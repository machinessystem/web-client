import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Doc } from '../models/doc.model';

@Injectable({
  providedIn: 'root'
})
export class DocService {


  constructor(private afdb: AngularFireDatabase) { }


  getDocumentations() {
    return this.afdb.list<Doc>('/documentations').valueChanges();
  }


}
