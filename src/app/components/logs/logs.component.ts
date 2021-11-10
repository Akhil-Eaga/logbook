import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { Log } from '../../models/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: Log[];

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
    })
  }

}
