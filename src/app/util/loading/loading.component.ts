import {Component, EventEmitter, OnInit} from '@angular/core';
import {LoadingMessage} from './loading.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  message: LoadingMessage;
  close = new EventEmitter();


  constructor() {

  }

  ngOnInit() {}

  public show(message: LoadingMessage) {
    this.message = message;
    if (!message.isShow) {
      this.onLoadingClose();
    }
  }


  onLoadingClose() {
    this.close.emit('event');
  }

}
