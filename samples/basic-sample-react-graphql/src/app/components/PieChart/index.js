import React from 'react';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';
import { PieChart } from 'react-d3-components';

const PieChartComponent = ({ fields }) => {
  if (fields.errors) {
    return (
      <div>
        <h4>Error loading component.</h4>
        {fields.errors.map((error) => <p key={error.message}>{error.message}</p>)}
      </div>
    );
  }

  const {
    data: { datasource: { children, title: { jss: title }, description: { jss: description } } },
  } = fields;

  const scale = parseInt(fields.data.datasource.scale.value);

  const data = {
    values: children.map((child) => ({ x: child.label.value, y: parseInt(child.value.value) })),
  };

  return (
    <div>
      <div id="Header" />
      <div id="Content">
        <div id="LeftContent">
          <Text tag="h1" className="contentTitle" field={title} />
          <RichText className="contentDescription" field={description} />
          <PieChart
            margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
            width={scale}
            height={scale}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
