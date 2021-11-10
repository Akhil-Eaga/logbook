import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string = '';
  text: string = '';
  date: any = '';
  isNew: boolean = true;

  constructor(private logService: LogService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.logService.selectedLog$.subscribe(log => {
      this.id = log.id;
      this.text = log.text;
      this.date = log.date;
      this.isNew = log.id ? false : true;
    });
  }

  onSubmit() {
    if (this.isNew) {
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      }
      // add the log
      this.logService.addLog(newLog);
      this.toastr.success("Log added");
    } else {
      const updatedLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      // update the log
      this.logService.updateLog(updatedLog);
      this.toastr.info("Log updated");
    }


    this.clearState();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  clearState() {
    this.id = '';
    this.text = '';
    this.date = '';
    this.isNew = true;

    this.logService.clearState();
  }

}
