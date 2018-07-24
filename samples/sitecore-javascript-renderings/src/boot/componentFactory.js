import SampleRendering from '../app/components/SampleRendering';
import SampleButton from '../app/components/SampleButton';

export const components = new Map();
components.set('SampleRendering', SampleRendering);
components.set('SampleButton', SampleButton);

const componentFactory = (componentName) => components.get(componentName);

export default componentFactory;
