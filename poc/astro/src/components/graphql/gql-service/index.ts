import jss from "@sitecore-jss/sitecore-jss";
import type { IQueryResult, IResultsItem } from "./types";
import type { GraphQLClient } from "@sitecore-jss/sitecore-jss/graphql";
import clientFactory from "@lib/graphql-client-factory";

const { debug } = jss;

// gql query variables

type QueryArgs = {
  contextItem: string;
  datasource: string;
  language: string;
};

// service definition

export interface IGQLConnectedDemoService {
  getContextItemData(
    itemId: string,
    datasourceId: string,
    language: string,
    query: string,
  ): Promise<IQueryResult<IResultsItem>>;
}

export class GQLConnectedDemoService implements IGQLConnectedDemoService {
  private _graphQlClient: GraphQLClient;

  constructor() {
    this._graphQlClient = clientFactory({ debugger: debug.common });
  }

  async getContextItemData(
    itemId: string,
    datasourceId: string,
    language: string,
    query: string
  ): Promise<IQueryResult<IResultsItem>> {
    const routeQueryResult: IQueryResult<IResultsItem> = await this.fetchQuery(
      itemId,
      datasourceId,
      language,
      query
    );
    return routeQueryResult;
  }

  protected async fetchQuery(
    itemId: string,
    datasourceId: string,
    language: string,
    query: string,
  ): Promise<IQueryResult<IResultsItem>> {
    const args: QueryArgs = {
      contextItem: itemId,
      datasource: datasourceId,
      language: language,
    };

    const response = await this._graphQlClient.request<
      IQueryResult<IResultsItem>
    >(query, { ...args });
    return response;
  }
}





