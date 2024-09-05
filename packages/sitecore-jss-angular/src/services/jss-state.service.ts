import { Injectable, TransferState } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayoutServiceContextData, RouteData } from '../public_api';

export class BaseJssState {
  sitecore?: LayoutServiceContextData & {
    route: RouteData | null;
  };
  viewBag?: { [key: string]: unknown };
}

/**
 * State service for JSS context data. Mainly works with context data from Sitecore's layout service response
 */
@Injectable()
export class JssStateService<State extends BaseJssState = BaseJssState> {
  /**
   * Observable JSS state to subscribe to
   */
  get state(): Observable<State> {
    return this._state.asObservable();
  }

  /**
   * The 'here and now' state value, usable without subscribing
   */
  get stateValue() {
    return this._state.value;
  }

  private _state: BehaviorSubject<State>;

  constructor(protected transferState: TransferState) {
    this._state = new BehaviorSubject<State>({} as State);
  }

  /**
   * Set new JSS state
   * @param {JssState} newState new state
   */
  setState(newState: State) {
    this._state.next(newState);
  }
}
