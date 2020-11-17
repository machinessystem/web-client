import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AppBasicInfo } from '../models/app.model';
import { GenService } from './gen.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private appBasicInfo = new BehaviorSubject<AppBasicInfo>(null);

  constructor(
    private afdb: AngularFireDatabase,
    private gen: GenService) {
  }

  populateAppBasicInfo() {
    this.getAppBasicInfo().subscribe(basicInfos => {
      this.appBasicInfo.next(basicInfos)
    })
  }

  getAppBasicInfo() {
    return this.afdb.object<AppBasicInfo>('appBasicInfos')
      .snapshotChanges().pipe(map(infos => this.gen.getValue<AppBasicInfo>(infos)));
  }
  get currentAppBasicInfo() {
    return this.appBasicInfo.toPromise();
  }
}
