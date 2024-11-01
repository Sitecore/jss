/* eslint-disable no-unused-vars */
import {
  GraphQLRequestClientFactory,
  GraphQLRequestClientFactoryConfig,
} from '@sitecore-jss/sitecore-jss';
import { DictionaryService } from '@sitecore-jss/sitecore-jss/i18n';
import { Metadata } from '@sitecore-jss/sitecore-jss/utils';
import { LayoutService, LayoutServiceData } from '@sitecore-jss/sitecore-jss/layout';
import { AppRenderer, RouteUrlParser } from '@sitecore-jss/sitecore-jss-proxy';
import { IncomingMessage, OutgoingMessage } from 'http';

export interface ServerBundle {
  [key: string]: unknown;
  renderView: AppRenderer;
  parseRouteUrl: RouteUrlParser;
  clientFactory: GraphQLRequestClientFactory;
  getClientFactoryConfig: () => GraphQLRequestClientFactoryConfig;
  defaultLanguage: string;
  layoutServiceFactory: { create: () => LayoutService };
  dictionaryServiceFactory: { create: () => DictionaryService };
  personalizeHelper: {
    personalizeLayout: (layoutData: unknown, variantIds: string[]) => LayoutServiceData;
    getVariantIds: (req: IncomingMessage, res: OutgoingMessage, path?: string) => Promise<string[]>;
  };
  components: string[] | Map<string, unknown>;
  metadata: Metadata;
}

export interface Config {
  [key: string]: unknown;
  port: string | number;
  serverBundle: ServerBundle;
}
