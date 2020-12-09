import { LayoutServiceData, LayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { IncomingMessage, ServerResponse } from 'http';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const layoutService = new LayoutService({
  apiHost: config.sitecoreApiHost,
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
});

export const invokeLayoutService = (
  itemPath: string,
  language?: string
): Promise<LayoutServiceData> => layoutService.fetchLayoutData(itemPath, language);

export const invokeSsrBasedLayoutService = (
  itemPath: string,
  language: string,
  req: IncomingMessage,
  res: ServerResponse
): Promise<LayoutServiceData> => {
  const onReq = (config: AxiosRequestConfig) => {
    // console.log('Incoming request headers from browser:', req.headers);

    config.headers.common = {
      ...config.headers.common,
      ...(req.headers.cookie && { cookie: req.headers.cookie }),
      ...(req.headers.referer && { referer: req.headers.referer }),
      ...(req.headers['user-agent'] && { 'user-agent': req.headers['user-agent'] }),
      ...(req.connection.remoteAddress && { 'X-Forwarded-For': req.connection.remoteAddress }),
    };

    // console.log('Modified request headers to Layout Service:', config.headers);
    return config;
  };

  const onRes = (response: AxiosResponse) => {
    // console.log('Incoming response headers from Layout Service:', response.headers);

    response.headers['set-cookie'] && res.setHeader('set-cookie', response.headers['set-cookie']);

    return response;
  };

  return layoutService.fetchLayoutData(itemPath, language, {
    onRes,
    onReq,
  });
};
