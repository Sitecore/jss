import React from 'react';

import Section from './field-templates/section';
import Text from './field-templates/text';
import SingleLineText from './field-templates/single-line-text';
import Button from './field-templates/button';

const factory = new Map();

factory.set('{447AA745-6D29-4B65-A5A3-8173AA8AF548}', Section);
factory.set('{983BFA5F-C6B6-4AEE-A3BB-46B95D52E7DF}', Text);
factory.set('{7CE25CAB-EF3A-4F73-AB13-D33BDC1E4EE2}', Button);
factory.set('{4EE89EA7-CEFE-4C8E-8532-467EF64591FC}', SingleLineText);

function fieldFactory(key, props) {
  let finalKey = key;

  if (key && key.model && key.model.fieldTypeItemId) {
    finalKey = key.model.fieldTypeItemId;
  }

  const Result = factory.get(finalKey);
  const finalProps = { ...props, fieldFactory };

  if (!Result) return <div key={finalKey}>No renderer for form element type {finalKey}</div>;

  return <Result {...finalProps} />;
}

export default fieldFactory;
