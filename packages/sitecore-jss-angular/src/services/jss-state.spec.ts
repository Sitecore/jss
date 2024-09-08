import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { JssStateService, BaseJssState } from './jss-state.service';
import { TransferState } from '@angular/platform-browser';

describe('JssStateService', () => {
  let service: JssStateService;
  let transferStateMock: jasmine.SpyObj<TransferState>;

  beforeEach(() => {
    transferStateMock = jasmine.createSpyObj('TransferState', ['get', 'set', 'hasKey']);

    TestBed.configureTestingModule({
      providers: [JssStateService, { provide: TransferState, useValue: transferStateMock }],
    });

    service = TestBed.inject(JssStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty state', () => {
    const initialState = service.stateValue;
    expect(initialState).toEqual({});
  });

  it('should return an observable of state', (done: DoneFn) => {
    service.state.subscribe((state) => {
      expect(state).toEqual({});
      done();
    });
  });

  it('should emit new state when setState is called', fakeAsync(() => {
    const newState: BaseJssState = {
      sitecore: {
        context: {
          pageEditing: true,
          language: 'en',
          site: { name: 'my-site' },
          clientScripts: ['script1.js'],
          clientData: { key: { innerKey: 'value' } },
        },
        route: {
          name: 'home',
          placeholders: {},
        },
      },
      viewBag: { key: 'value' },
    };

    let capturedState: BaseJssState | undefined;

    service.state.subscribe((state) => {
      capturedState = state;
    });

    service.setState(newState);

    flush();

    expect(capturedState).toEqual(newState);
  }));
});
