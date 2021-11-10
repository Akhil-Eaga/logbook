import { Injectable } from '@angular/core';
import { Log } from '../models/log';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[] =
    [
      {
        id: '1',
        text: 'Generated components',
        date: new Date()
      },
      {
        id: '2',
        text: 'Added the html',
        date: new Date()
      },
      {
        id: '3',
        text: 'Updated the angular json',
        date: new Date()
      }
    ];

  constructor() { }

  getLogs(): Observable<Log[]> {

    return of(this.logs);

  }
}
