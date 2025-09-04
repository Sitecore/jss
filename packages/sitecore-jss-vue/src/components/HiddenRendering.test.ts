import { mount } from '@vue/test-utils';
import { HiddenRendering } from './HiddenRendering';

describe('<HiddenRendering />', () => {
  it('should render', () => {
    const renderedComponent = mount(HiddenRendering);
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
