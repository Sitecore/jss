import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Row as LayoutRow } from 'antd';

const Row = ({ params, rendering }) => (
  <LayoutRow
    style={{backgroundColor: params.backgroundColor }}
    justify={params.justify }
  >
    <Placeholder name="jssdocs-row" rendering={rendering} />
  </LayoutRow>
);

export default Row;