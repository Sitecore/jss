/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */

import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import { DictionaryService } from './dictionary-service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { IncomingMessage, ServerResponse } from 'http';
import { AxiosDataFetcher } from './data-fetcher';
import { DictionaryPhrases, PlaceholderData } from './dataModels';

use(spies);

describe('DictionaryService', () => {
  let mock: MockAdapter;

  before(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  after(() => {
    mock.restore();
  });
});
