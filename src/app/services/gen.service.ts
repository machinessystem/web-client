import { Injectable } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GenService {

  constructor() { }

  getValue<T>(values: SnapshotAction<T>, id = '_id') {
    let val: T = { ...values.payload.val(), [id]: values.payload.key }
    return val;
  }

  getValues<T>(values: SnapshotAction<T>[], id = '_id') {
    return values.map(x => {
      let val: T = { ...x.payload.val(), [id]: x.payload.key }
      return val;
    })
  }

  /**
   * 
   * @param targetedObject object inside which array is to generated
   * @param key which is to be used as a key to new array
   */
  convertToArrayInsideObject(targetedObject: any, newKey: string, key: string = '_id') {
    let newArray = [];
    let newObject = {}
    let valOfKey: string = '';
    Object.keys(targetedObject).forEach(objectKey => {
      if (objectKey === key) return valOfKey = targetedObject[objectKey];
      let targettedValue = targetedObject[objectKey]; //Iterates for 0, 1, 2, 3,...,n, except the key
      newArray.push(targettedValue);
    })
    return Object.assign(newObject, { [newKey]: valOfKey, values: newArray });
  }
}
