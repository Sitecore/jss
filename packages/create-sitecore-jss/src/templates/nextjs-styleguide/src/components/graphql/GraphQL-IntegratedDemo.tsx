import { Text, Link, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import NextLink from 'next/link';

type DataSource = {
  sample1: {
    jsonValue: {
      value: string;
    };
    value: string;
  };
  sample2: {
    definition: {
      type: string;
      shared: boolean;
    };
    jsonValue: {
      value: {
        href: string;
        linktype: string;
        target: string;
        text: string;
        url: string;
      };
    };
    target: string;
    text: string;
    url: string;
  };
  name: string;
  id: string;
};

type Item = {
  id: string;
  url: {
    path: string;
  };
  pageTitle: {
    value: string;
    jsonValue: {
      value: string;
    };
  };
};

type ItemSearchResults = {
  results: Item[];
};

type GraphQlIntegratedDemoProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
      contextItem: {
        id: string;
        children: ItemSearchResults;
        pageTitle: {
          value: string;
        };
      };
    };
  };
};

const GraphQLIntegratedDemo = (props: GraphQlIntegratedDemoProps): JSX.Element => {
  // Query results in integrated GraphQL replace the normal `fields` data
  // i.e. with { data, }
  const { datasource, contextItem } = props.fields.data;

  return (
    <div data-e2e-id="graphql-integrated">
      <h2>GraphQL Integrated Demo</h2>

      <p>
        Integrated GraphQL executes GraphQL queries within the Layout Service endpoint, and merges
        the query results into the Layout Service result JSON. The query results can be seen by
        inspecting the Layout Service response.
      </p>

      {datasource && (
        <div>
          <h4>Datasource Item (via Integrated GraphQL)</h4>
          id: {datasource.id}
          <br />
          name: {datasource.name}
          <br />
          sample1: {datasource.sample1.value}
          <br />
          sample1 (editable): <Text field={datasource.sample1.jsonValue} />
          <br />
          sample2:
          <br />
          <ul>
            <li>text: {datasource.sample2.text}</li>
            <li>url: {datasource.sample2.url}</li>
            <li>target: {datasource.sample2.target}</li>
            <li>
              editable: <Link field={datasource.sample2.jsonValue} />
            </li>
            <li>field type: {datasource.sample2.definition.type}</li>
            <li>field is shared?: {datasource.sample2.definition.shared.toString()}</li>
          </ul>
        </div>
      )}
      {contextItem && (
        <div>
          <h4>Route Item (via Integrated GraphQL)</h4>
          id: {contextItem.id}
          <br />
          page title: {contextItem.pageTitle.value}
          <br />
          children:
          <ul>
            {contextItem.children.results.map((child: Item) => (
              <li key={child.id}>
                <NextLink href={child.url.path}>
                  {child.pageTitle.value}
                </NextLink>
                &nbsp; (editable title too! <Text field={child.pageTitle.jsonValue} />)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default withDatasourceCheck()<GraphQlIntegratedDemoProps>(GraphQLIntegratedDemo);
