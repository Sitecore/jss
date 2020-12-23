/* eslint-disable @typescript-eslint/no-empty-function */
import { mount } from '@vue/test-utils';
import { MissingComponent } from './MissingComponent';

describe('<MissingComponent />', () => {
  it('should render', () => {
    const logSpy = jest.spyOn(console, 'log');
    logSpy.mockImplementation(() => {});

    const renderedComponent = mount(MissingComponent, {
      context: {
        props: {
          rendering: { componentName: 'missing' },
        },
      },
    });
    expect(renderedComponent.html()).toMatchSnapshot();
    expect(logSpy).toHaveBeenCalledTimes(1);
    logSpy.mockRestore();
  });
});
