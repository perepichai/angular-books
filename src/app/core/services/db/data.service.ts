import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb() {
    return {
      owners: []
    };
  }
  genId<T extends { id: any }>(collection: T[], collectionName: string): any {
    return collection.reduce((prev, curr) =>
    {
        return (curr.id + 1) || 0;
    }, 1);
}
}
