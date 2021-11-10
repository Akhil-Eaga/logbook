import { Injectable } from '@angular/core';
import { Log } from '../models/log';

import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];

  selectedLogSource = new BehaviorSubject<Log>({ id: null, text: null, date: null });
  selectedLog$ = this.selectedLogSource.asObservable();

  clearStateSource = new BehaviorSubject<boolean>(true);
  clearState$ = this.clearStateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {
    //     id: '1',
    //     text: 'Generated components',
    //     date: new Date()
    //   },
    //   {
    //     id: '2',
    //     text: 'Added the html',
    //     date: new Date()
    //   },
    //   {
    //     id: '3',
    //     text: 'Updated the angular json',
    //     date: new Date()
    //   }
    // ];

    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs')) {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    } else {
      this.logs = [];
    }
    return of(this.logs);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    // add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  selectFormLog(log: Log) {
    this.selectedLogSource.next(log);
  }

  updateLog(log: Log) {
    this.logs.forEach((currentLog, currentIndex) => {
      if (log.id === currentLog.id) {
        this.logs.splice(currentIndex, 1);
      }
    });
    this.logs.unshift(log);

    // update the local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((currentLog, currentIndex) => {
      if (log.id === currentLog.id) {
        this.logs.splice(currentIndex, 1);
      }
    });

    // delete item from local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.selectedLogSource.next({ id: null, text: null, date: null });
    this.clearStateSource.next(true);
  }
}
