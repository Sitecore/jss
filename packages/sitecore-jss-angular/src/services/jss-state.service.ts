import { Injectable, TransferState } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayoutServiceContextData, RouteData } from '../public_api';

export class BaseJssState {
  [key: string]: unknown;
  sitecore?: LayoutServiceContextData & {
    route: RouteData | null;
  };
  viewBag?: { [key: string]: unknown };
}

/**
 * State service for JSS context data. Mainly works with context data from Sitecore's layout service response
 */
@Injectable()
export class JssStateService {
  /**
   * Observable JSS state to subscribe to
   */
  get state(): Observable<BaseJssState> {
    return this._state.asObservable();
  }

  /**
   * The 'here and now' state value, usable without subscribing
   */
  get stateValue() {
    return this._state.value;
  }

  private _state: BehaviorSubject<BaseJssState>;

  constructor(protected transferState: TransferState) {
    this._state = new BehaviorSubject<BaseJssState>(new BaseJssState());
  }

  /**
   * Set new JSS state
   * @param {JssState} newState new state
   */
  setState(newState: BaseJssState) {
    this._state.next(newState);
  }
}
