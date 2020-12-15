import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { IncomingMessage, ServerResponse } from 'http';

export type AxiosDataFetcherHandlers = {
  /**
   * Callback which executed before request is sent. You can modify axios config.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {AxiosRequestConfig} config axios config
   */
  onReq?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  /**
   * Callback which invoked when request error happened.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {unknown} error
   */
  onReqError?: (error: unknown) => unknown;
  /**
   * Callback which invoked when got response from server.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {AxiosResponse} serverRes server response
   */
  onRes?: (serverRes: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  /**
   * Callback which invoked when status codes fallen outside the range of 2xx.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {unknown} error
   */
  onResError?: (error: unknown) => unknown;
};

export type AxiosDataFetcherConfig = AxiosRequestConfig & AxiosDataFetcherHandlers;

export class AxiosDataFetcher {
  instance: AxiosInstance;
  handlers: AxiosDataFetcherHandlers;

  constructor(dataFetcherConfig: AxiosDataFetcherConfig = {}) {
    const { onReq, onRes, onReqError, onResError, ...axiosConfig } = dataFetcherConfig;

    this.handlers = { onReq, onRes, onReqError, onResError };

    this.instance = axios.create(axiosConfig);
  }

  /**
   * Setup request headers
   * @param {IncomingMessage} req
   * @param {AxiosRequestConfig} reqConfig
   */
  private setupReqHeaders(req: IncomingMessage, reqConfig: AxiosRequestConfig) {
    reqConfig.headers.common = {
      ...reqConfig.headers.common,
      ...(req.headers.cookie && { cookie: req.headers.cookie }),
      ...(req.headers.referer && { referer: req.headers.referer }),
      ...(req.headers['user-agent'] && { 'user-agent': req.headers['user-agent'] }),
      ...(req.connection.remoteAddress && { 'X-Forwarded-For': req.connection.remoteAddress }),
    };

    return reqConfig;
  }

  /**
   * Setup response headers based on response from layout service
   * @param {ServerResponse} res
   * @param {AxiosResponse} serverRes
   */
  private setupResHeaders(res: ServerResponse, serverRes: AxiosResponse) {
    serverRes.headers['set-cookie'] && res.setHeader('set-cookie', serverRes.headers['set-cookie']);

    return serverRes;
  }

  /**
   * Implements a data fetcher. @see HttpJsonFetcher<T> type for implementation details/notes.
   * @param {string} url The URL to request; may include query string
   * @param {any} [data] Optional data to POST with the request.
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   */
  fetch(
    url: string,
    data?: unknown,
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<AxiosResponse> {
    this.instance.interceptors.request.use((reqConfig: AxiosRequestConfig) => {
      if (req) {
        reqConfig = this.setupReqHeaders(req, reqConfig);
      }

      return this.handlers.onReq ? this.handlers.onReq(reqConfig) : reqConfig;
    }, this.handlers.onReqError);

    this.instance.interceptors.response.use((layoutServiceRes: AxiosResponse) => {
      if (res) {
        layoutServiceRes = this.setupResHeaders(res, layoutServiceRes);
      }

      return this.handlers.onRes ? this.handlers.onRes(layoutServiceRes) : layoutServiceRes;
    }, this.handlers.onResError);

    return this.instance.request({
      url,
      method: data ? 'POST' : 'GET',
      data,
      // note: axios needs to use `withCredentials: true` in order for Sitecore cookies to be included in CORS requests
      // which is necessary for analytics and such
      withCredentials: true,
    });
  }
}
