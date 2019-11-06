import Welcome from './components/Welcome';
import StyleguideFieldUsageText from './components/Styleguide-FieldUsage-Text'
import StyleguideFieldUsageRichText from './components/Styleguide-FieldUsage-RichText';
import StyleguideFieldUsageImage from './components/Styleguide-FieldUsage-Image';
import StyleguideFieldUsageNumber from './components/Styleguide-FieldUsage-Number';

const components = new Map();

components.set('Styleguide-FieldUsage-Text', StyleguideFieldUsageText)
components.set('Styleguide-FieldUsage-RichText', StyleguideFieldUsageRichText)
components.set('Styleguide-FieldUsage-Image', StyleguideFieldUsageImage)
components.set('Styleguide-FieldUsage-Number', StyleguideFieldUsageNumber)
components.set('Welcome', Welcome);

const componentFactory = (componentName) => components.get(componentName);

export default componentFactory;
