/**
 * Generates React boilerplate for a component under `src/components`
 * @param componentName - the component name
 * @returns component src boilerplate as a string
 */
function generateComponentSrc(componentName: string): string {
  return `import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

interface ${componentName}Props {
  title: string;
  columnsCount: number;
}

export const ${componentName} = (props: ${componentName}Props): JSX.Element => {
  const columns: string[] = [];
  for (let i = 0; i < props.columnsCount; i++) {
    columns.push(\`Component Column \${i + 1}\`);
  }
  return (
    <div className="container">
      <h2>{props.title || 'BYOC Demo'}</h2>
      <p>${componentName} Component</p>
      <div className="row">
        {columns.map((text, index) => (
          <div key={index} className={\`col-sm-\${props.columnsCount}\`}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

FEAAS.External.registerComponent(${componentName}, {
  name: '${componentName}',
  properties: {
    title: {
      type: 'string',
    },
    columnsCount: {
      type: 'number',
    },
  },
});
`;
}

export default generateComponentSrc;
