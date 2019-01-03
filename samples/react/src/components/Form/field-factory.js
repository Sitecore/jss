import React from 'react';

import Section from './field-templates/section';
import Text from './field-templates/text';
import SingleLineText from './field-templates/single-line-text';
import Button from './field-templates/button';
import Checkbox from './field-templates/checkbox';
import CheckboxList from './field-templates/checkbox-list';
import DropdownList from './field-templates/dropdown-list';
import Date from './field-templates/date';
import Email from './field-templates/email';
import ListBox from './field-templates/list-box';
import MultipleLineText from './field-templates/multiple-line-text';
import Number from './field-templates/number';
import Password from './field-templates/password';
import RadioButtonList from './field-templates/radio-button-list';
import Telephone from './field-templates/telephone';

const factory = new Map();

// maps field type IDs from Sitecore (/sitecore/system/Settings/Forms/Field Types)
// into an implementing React component - this is very similar to the JSS componentFactory,
// but it maps form element components instead of layout components

factory.set('{447AA745-6D29-4B65-A5A3-8173AA8AF548}', Section);
factory.set('{983BFA5F-C6B6-4AEE-A3BB-46B95D52E7DF}', Text);
factory.set('{7CE25CAB-EF3A-4F73-AB13-D33BDC1E4EE2}', Button);
factory.set('{4EE89EA7-CEFE-4C8E-8532-467EF64591FC}', SingleLineText);
factory.set('{A296A1C1-0DA0-4493-A92E-B8191F43AEC6}', MultipleLineText);
factory.set('{38137D30-7B2A-47D5-BBD8-133252C01B28}', Date);
factory.set('{04C39CAC-8976-4910-BE0D-879ED3368429}', Email);
factory.set('{5B153FC0-FC3F-474F-8CB8-233FB1BEF292}', Number);
factory.set('{4DA85E8A-3B48-4BC6-9565-8C1F5F36DD1B}', Checkbox);
factory.set('{DF74F55B-47E6-4D1C-92F8-B0D46A7B2704}', Telephone);

factory.set('{E0CFADEE-1AC0-471D-A820-2E70D1547B4B}', DropdownList);
factory.set('{D86A361A-D4FF-46B2-9E97-A37FC5B1FE1A}', CheckboxList);
factory.set('{222A2121-D370-4C6F-80A3-03C930B718BF}', ListBox);
factory.set('{EDBD38A8-1AE9-42EC-8CCD-F5B0E2998B4F}', RadioButtonList);

factory.set('{668A1C37-9D6B-483B-B7C1-340C92D04BA4}', Password);

function fieldFactory(key, props) {
  let finalKey = key;

  if (key && key.model && key.model.fieldTypeItemId) {
    finalKey = key.model.fieldTypeItemId;
  }

  const Result = factory.get(finalKey);

  if (!Result) return <div key={finalKey}>No renderer for form element type {finalKey}</div>;

  return <Result {...props} />;
}

export default fieldFactory;
