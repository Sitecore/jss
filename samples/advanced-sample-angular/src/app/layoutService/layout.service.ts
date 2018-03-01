import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class LayoutService {
  abstract getRouteData(route: string, language: string, options?: object): Observable<any>;
  abstract getPlaceholderData(placeholderName: string, route: string, language: string, options?: object): Observable<any>;
  abstract getItemData(itemPath: string, language: string, options?: object): Observable<any>;
}

export class LayoutServiceError {
  status: number;
  statusText: string;
}
