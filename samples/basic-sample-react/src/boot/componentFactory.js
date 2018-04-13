import Welcome from '../app/components/Welcome';

const components = new Map();
components.set('Welcome', Welcome);

const componentFactory = (componentName) => components.get(componentName);

export default componentFactory;
