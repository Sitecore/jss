import { Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import NextLink from 'next/link';
import { getPublicUrl } from 'lib/util';

interface DataSource {
  sample1: {
    jss: {
      value: string;
    };
    value: string;
  };
  sample2: {
    definition: {
      type: string;
      shared: boolean;
    };
    jss: {
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
}

interface ContextItemChild {
  id: string;
  url: string;
  pageTitle: {
    value: string;
    jss: {
      value: string;
    };
  };
}

interface GraphQlIntegratedDemoProps {
  fields: {
    data: {
      datasource: DataSource;
      contextItem: {
        id: string;
        children: ContextItemChild[];
        pageTitle: {
          value: string;
        };
      };
    };
  };
}

const GraphQLIntegratedDemo = (props: GraphQlIntegratedDemoProps): JSX.Element => {
  // Query results in integrated GraphQL replace the normal `fields` data
  // i.e. with { data, }
  const { datasource, contextItem } = props.fields.data;
  // Prefix next/link paths with a publicUrl to disable Next.js prefetching in the Sitecore Experience Editor.
  // If you're not supporting the Experience Editor, you can remove this.
  const publicUrl = getPublicUrl();

  return (
    <div data-e2e-id="graphql-integrated">
      <h2>GraphQL Integrated Demo</h2>

      <p>
        Integrated GraphQL executes GraphQL queries within the Layout Service endpoint, and merges
        the query results into the Layout Service result JSON. The query results can be seen by
        inspecting the Layout Service response in the browser devtools network tab.
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
          sample1 (editable): <Text field={datasource.sample1.jss} />
          <br />
          sample2:
          <br />
          <ul>
            <li>text: {datasource.sample2.text}</li>
            <li>url: {datasource.sample2.url}</li>
            <li>target: {datasource.sample2.target}</li>
            <li>
              editable: <Link field={datasource.sample2.jss} />
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
            {contextItem.children.map((child: ContextItemChild) => (
              <li key={child.id}>
                <NextLink href={publicUrl + child.url}>
                  <a>{child.pageTitle.value}</a>
                </NextLink>
                &nbsp; (editable title too! <Text field={child.pageTitle.jss} />)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GraphQLIntegratedDemo;
