import { Injectable } from '@angular/core';

// Custom service to be used for "providers" in the lazy-loading module
@Injectable()
export class MockService {
  get(text: string): string {
    return text;
  }
}
