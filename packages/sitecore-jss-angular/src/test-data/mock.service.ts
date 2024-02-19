import { Injectable } from '@angular/core';

@Injectable()
export class MockService {
  get(num: number): number {
    return num;
  }
}
