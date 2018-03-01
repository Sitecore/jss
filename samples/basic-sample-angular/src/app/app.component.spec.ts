import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { JssService, JssState } from './jss.service';

class MockService {
  getRouteData(route: string): JssState {
    return new JssState();
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        JssModule.withComponents([])
      ],
      providers: [
        { provide: JssService, useClass: MockService }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
