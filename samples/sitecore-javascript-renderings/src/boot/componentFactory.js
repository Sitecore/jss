import SampleRendering from '../app/components/SampleRendering';
import SamplePlaceholders from '../app/components/SamplePlaceholders';
import SampleInteractivity from '../app/components/SampleInteractivity';

export const components = new Map();
components.set('SampleRendering', SampleRendering);
components.set('SamplePlaceholders', SamplePlaceholders);
components.set('SampleInteractivity', SampleInteractivity);

const componentFactory = (componentName) => components.get(componentName);

export default componentFactory;
