import Welcome from './components/Welcome';
import StyleguideFieldUsageText from './components/Styleguide-FieldUsage-Text'
import StyleguideFieldUsageRichText from './components/Styleguide-FieldUsage-RichText';

const components = new Map();

components.set('Styleguide-FieldUsage-Text', StyleguideFieldUsageText)
components.set('Styleguide-FieldUsage-RichText', StyleguideFieldUsageRichText)
components.set('Welcome', Welcome);

const componentFactory = (componentName) => components.get(componentName);

export default componentFactory;
