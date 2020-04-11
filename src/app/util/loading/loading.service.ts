import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

export class LoadingMessage {
  constructor(public isShow: boolean) {

  }
}

@Injectable()
export class LoadingService {

  observable: Observable<LoadingMessage>;
  private subject: Subject<LoadingMessage> = new Subject<LoadingMessage>();

  constructor() {
    this.observable = this.subject.asObservable();
  }

  public show(isShow: boolean) {
    this.subject.next(new LoadingMessage(isShow));
  }
}
