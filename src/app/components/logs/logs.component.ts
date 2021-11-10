import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { Log } from '../../models/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: Log[];
  selectedLog: Log;
  loaded: boolean = false;

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.logService.clearState$.subscribe(value => {
      if (value) {
        this.selectedLog = { id: null, text: null, date: null };
      }
    })

    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    });
  }

  onSelect(log: Log) {
    this.logService.selectFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log) {
    if (confirm("Are you sure you want to delete this log?")) {
      this.logService.deleteLog(log);
    }
  }

}
