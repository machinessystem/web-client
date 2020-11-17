import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { GenService } from './gen.service';
import { Command } from '../models/command.model';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  
  endPoint = 'instancesCommands';

  constructor(
    private afdb: AngularFireDatabase,
    private gen: GenService) { }

  send(instanceId: string, pinNo: string, command: any) {
    return this.afdb.object(`${this.endPoint}/${instanceId}/${pinNo}/${Date.now()}`).set(command);
  }

  getLastCommandByPinNumber(instanceId: string, pinNo: string) {
    return this.afdb.list(`${this.endPoint}/${instanceId}/${pinNo}`, ref => ref.limitToLast(1)).valueChanges()
  }

  get(instanceId: string, pinNo: string) {
    return this.afdb.list<Command>(`${this.endPoint}/${instanceId}/${pinNo}`).snapshotChanges().pipe(map(responses => this.gen.getValues(responses)));
  }

  getAll(instanceId: string) {
    return this.afdb.list(`${this.endPoint}/${instanceId}`).snapshotChanges().pipe(map(responses => this.gen.getValues(responses)));
  }

  clearAll(instanceId: string) {
    return this.afdb.object(`${this.endPoint}/${instanceId}`).remove();
  }
}
