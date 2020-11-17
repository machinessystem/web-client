import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { InfoService } from './info.service';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private title: Title,
    private meta: Meta,
    private infoService: InfoService) { }

  setTitleOnly(title) {
    this.title.setTitle(title);
  }

  async setTitle(title: string) {
    try {
      const { appName } = await this.infoService.currentAppBasicInfo;
      console.log(appName);

    }
    catch (e) { console.log(e) }
    // if (!appName) return;
    // this.setTitle(`${title} | ${appName}`);

  }
}
