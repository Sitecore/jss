/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { ExperienceEditor } from '@sitecore-jss/sitecore-jss/utils';

import { withEditorChromes } from '../enhancers/withEditorChromes';

const SampleComponent: React.FC<{ stringProp: string }> = (props: { stringProp: string }) => {
  return <div>{props.stringProp}</div>;
};

describe('withEditorChromes', () => {
  it('should update chromes on update', () => {
    const WrappedComponent = withEditorChromes(SampleComponent as React.FC<unknown>);
    const props = {
      stringProp: '123',
    };
    // sinon cannot spy on the resetEditorChromes instance used in withEditorChromes - so we test for method that is called by it
    const utilSpy = spy(ExperienceEditor, 'isActive');

    const rendered = mount(<WrappedComponent {...props} />);
    expect(rendered.children.length).to.not.equal(0);
    rendered.setProps({ stringProp: '456' });
    expect(utilSpy.called).to.be.true;
  });
});
