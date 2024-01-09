import { Text, Link } from '@sitecore-jss/sitecore-jss-react';

const GraphQLIntegratedDemo = (props) => {
  const { datasource, contextItem } = props.rendering.fields.data;

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
          sample1: {datasource.sample1?.value}
          <br />
          sample1 (editable): <Text field={datasource.sample1?.jsonValue} />
          <br />
          sample2:
          <br />
          <ul>
            <li>text: {datasource.sample2?.text}</li>
            <li>url: {datasource.sample2?.url}</li>
            <li>target: {datasource.sample2?.target}</li>
            <li>
              editable: <Link field={datasource.sample2?.jsonValue} />
            </li>
            <li>field type: {datasource.sample2?.definition.type}</li>
            <li>field is shared?: {datasource.sample2?.definition.shared.toString()}</li>
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
            {contextItem.children.results.map((child) => (
              <li key={child.id}>
                <a>
                  {child.pageTitle.value}
                </a>
                &nbsp; (editable title too! <Text field={child.pageTitle.jsonValue} />)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GraphQLIntegratedDemo;
