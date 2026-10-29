import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';

import Page from './page';

describe('<Page />', () => {
  it('should render page container div with cssClass and render children via fieldFactory', () => {
    const props = {
      field: {
        model: {
          cssClass: 'test-page-css-class',
        },
        fields: [{ model: { name: 'field_1' } }, { model: { name: 'field_2' } }],
      },
      fieldFactory: (childField: any, index: number) => (
        <span key={index} className="child-field">
          {childField.model.name}
        </span>
      ),
    };

    const rendered = render(<Page {...(props as any)} />);
    const pageDiv = rendered.container.querySelector('div')!;

    expect(pageDiv).to.not.be.null;
    expect(pageDiv.getAttribute('class')).to.equal('test-page-css-class');

    const children = rendered.container.querySelectorAll('.child-field');
    expect(children.length).to.equal(2);
    expect(children[0].textContent).to.equal('field_1');
    expect(children[1].textContent).to.equal('field_2');
  });
});
