import axios, {AxiosRequestConfig} from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { AxiosDataFetcher } from './data-fetcher';

describe('AxiosDataFetcher', () => {
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

	it('should execute POST request with data', () => {
		mock.onPost().reply((config) => {
			// append axios config as response data
      return [200, { ...config }];
		})
		
		const fetcher = new AxiosDataFetcher();

		return fetcher.fetch('/styleguide', { x: 'val1', y: 'val2' }).then((res: any) => {
			expect(res.status).to.equal(200);
			expect(res.data.data).to.equal('{"x":"val1","y":"val2"}')
			expect(res.data.url).to.equal('/styleguide');
			expect(res.data.withCredentials, 'with credentials is not true').to.be.true;
		})
	})

	it('should execute GET request withouth data', () => {
		mock.onGet().reply((config) => {
			// append axios config as response data
      return [200, { ...config }];
		})
		
		const fetcher = new AxiosDataFetcher();

		return fetcher.fetch('/home').then((res: any) => {
			expect(res.status).to.equal(200);
			expect(res.data.data).to.equal(undefined);
			expect(res.data.url).to.equal('/home');
			expect(res.data.withCredentials, 'with credentials is not true').to.be.true;
		})
	})

	it('should execute failed request with data', () => {
		mock.onPost().reply((config) => {
			// append axios config as response data
      return [400, { ...config }];
		})
		
		const fetcher = new AxiosDataFetcher();

		return fetcher.fetch('/styleguide', { x: 'val1', y: 'val2' }).catch(err => {
			expect(err.response.status).to.equal(400);
			expect(err.response.data.url).to.equal('/styleguide');
		})
	})

	it('should execute request with custom config', () => {
		mock.onGet().reply((config) => {
			// append axios config as response data
      return [204, { ...config }];
		})

		const config: AxiosRequestConfig = {
			timeout: 200,
			auth: {
				username: 'xxx',
				password: 'bbb'
			}
		}
		
		const fetcher = new AxiosDataFetcher(config);

		return fetcher.fetch('/home').then((res: any) => {
			expect(res.status).to.equal(204);
			expect(res.data.auth).to.deep.equal({
				username: 'xxx',
				password: 'bbb'
			})
			expect(res.data.timeout).to.equal(200);
			expect(res.data.data).to.equal(undefined);
			expect(res.data.url).to.equal('/home');
			expect(res.data.withCredentials, 'with credentials is not true').to.be.true;
		})
	})
})
