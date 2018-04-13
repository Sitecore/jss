import Wizard from './components/Wizard';
import StepReference from './components/StepReference';
import RichText from './components/RichText';
import Heading from './components/Heading';
import Question from './components/Question';
import FormValues from './components/FormValues';

const components = new Map();
components.set('Wizard', Wizard);
components.set('StepReference', StepReference);
components.set('RichText', RichText);
components.set('Heading', Heading);
components.set('Question', Question);
components.set('FormValues', FormValues);

export default (componentName) => components.get(componentName);
