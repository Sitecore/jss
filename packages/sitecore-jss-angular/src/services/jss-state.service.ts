import { Injectable, TransferState } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JssState } from './models';

@Injectable()
export class JssStateService {
  get state(): Observable<JssState> {
    return this._state.asObservable();
  }
  private _state: BehaviorSubject<JssState>;

  constructor(protected transferState: TransferState) {
    this._state = new BehaviorSubject<JssState>(new JssState());
  }

  getStateValue() {
    return this._state.value;
  }

  setState(newState: JssState) {
    this._state.next(newState);
  }
}
