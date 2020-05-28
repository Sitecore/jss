import Article from '../app/components/Article';
import FeatureJumbo from '../app/components/FeatureJumbo';
import FeatureJumboShort from '../app/components/FeatureJumboShort';
import Hero from '../app/components/Hero';
import Logo from '../app/components/Logo';
import SideNav from '../app/components/Navigation/SideNav';
import TileHeadline from '../app/components/TileHeadline';
import Tile from '../app/components/Tile';
import ArticleContainer from '../app/containers/ArticleContainer';
import TwocolContainer from '../app/containers/TwocolContainer';
import PageContainer from '../app/containers/PageContainer';
import TileContainer from '../app/containers/TileContainer';
import TileWithButton from '../app/components/TileWithButton';

const components = new Map();
components.set('Article', Article);
components.set('FeatureJumbo', FeatureJumbo);
components.set('FeatureJumboShort', FeatureJumboShort);
components.set('Hero', Hero);
components.set('Logo', Logo);
components.set('SideNav', SideNav);
components.set('TileHeadline', TileHeadline);
components.set('Tile', Tile);
components.set('TileWithButton', TileWithButton);

components.set('PageContainer', PageContainer);
components.set('ArticleContainer', ArticleContainer);
components.set('TwocolContainer', TwocolContainer);
components.set('TileContainer', TileContainer);

const componentFactory = (componentName) => components.get(componentName);

export default componentFactory;
