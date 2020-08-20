import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Row as LayoutRow } from 'antd';

const Row = ({ params, rendering }) => (
  <LayoutRow
    style={{margin: params.margin, padding: params.padding}}
    justify={params.justify}
    align={params.align}
    gutter={{ md: params.compactGutter, lg: params.fullSizeGutter}}
  >
    <Placeholder name="jssdocs-row" rendering={rendering} />
  </LayoutRow>
);

export default Row;