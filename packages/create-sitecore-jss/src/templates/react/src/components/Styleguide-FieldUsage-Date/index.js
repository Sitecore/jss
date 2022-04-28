import React from 'react';
import { DateField } from '@sitecore-jss/sitecore-jss-react';
import StyleguideSpecimen from '../Styleguide-Specimen';

/**
 * Demonstrates usage of date and time content field types within JSS.
 */
const StyleguideFieldUsageDate = (props) => {
  return (
    <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-date">
      <ul>
        <li>
          Date helper: <DateField field={props.fields.date} />
        </li>
        <li>
          Date helper (datetime): <DateField field={props.fields.dateTime} />
        </li>
        <li>
          UTC Date string:&nbsp;
          {/*
            Date helper supports a render props API to give you direct access to the JS Date object for formatting.
            IMPORTANT: the render prop is ignored when in Experience Editor mode to support inline editing.
          */}
          <DateField field={props.fields.date} render={(date) => date.toUTCString()} />
        </li>
        <li>
          Localized Date string (local timezone):&nbsp;
          <DateField field={props.fields.date} render={(date) => date.toLocaleDateString()} />
        </li>
        <li>
          Localized DateTime string (local timezone):&nbsp;
          {/* React components can also be returned from the render props for wrapping */}
          <DateField
            field={props.fields.dateTime}
            render={(date) => <em>{date.toLocaleString()}</em>}
          />
        </li>
      </ul>
    </StyleguideSpecimen>
  );
};

export default StyleguideFieldUsageDate;
