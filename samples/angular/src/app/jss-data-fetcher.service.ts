import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpResponse } from '@sitecore-jss/sitecore-jss';
import { Observable } from 'rxjs';

@Injectable()
export class JssDataFetcherService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
    this.fetch = this.fetch.bind(this);
  }

  fetch<T>(url: string, data: any): Promise<HttpResponse<T>> {
    let result: Observable<T>;

    const options = {
      withCredentials: true,
    };

    if (data) {
      result = this.httpClient.post<T>(url, data, options);
    } else {
      result = this.httpClient.get<T>(url, options);
    }

    return result.toPromise()
      .then((responseData) => ({
          data: responseData as T,
          status: 200,
          statusText: 'OK'
      }))
      .catch((error: HttpErrorResponse) => {
        if (error instanceof Error) {
          throw error;
        }

        return {
          data: error.error as T,
          status: error.status,
          statusText: error.statusText
        };
      });
  }
}
