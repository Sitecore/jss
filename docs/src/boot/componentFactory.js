import Article from 'components/Article';
import Disclaimers from 'components/Disclaimers';
import FeatureJumbo from 'components/FeatureJumbo';
import FeatureJumboShort from 'components/FeatureJumboShort';
import FooterNav from 'components/navigation/FooterNav';
import Hero from 'components/Hero';
import Logo from 'components/Logo';
import MainNav from 'components/navigation/MainNav';
import SideNav from 'components/navigation/SideNav';
import TileHeadline from 'components/TileHeadline';
import Tile from 'components/Tile';
import TileWithButton from 'components/TileWithButton';

import ArticleContainer from 'containers/ArticleContainer';
import TileContainer from 'containers/TileContainer';
import TwocolContainer from 'containers/TwocolContainer';
import PageContainer from 'containers/PageContainer';
import Row from 'containers/Row';


const components = new Map();
components.set('Article', Article);
components.set('Disclaimers', Disclaimers);
components.set('FeatureJumbo', FeatureJumbo);
components.set('FeatureJumboShort', FeatureJumboShort);
components.set('FooterNav', FooterNav);
components.set('Hero', Hero);
components.set('Logo', Logo);
components.set('MainNav', MainNav);
components.set('SideNav', SideNav);
components.set('TileHeadline', TileHeadline);
components.set('Tile', Tile);
components.set('TileWithButton', TileWithButton);

components.set('ArticleContainer', ArticleContainer);
components.set('TileContainer', TileContainer);
components.set('TwocolContainer', TwocolContainer);
components.set('PageContainer', PageContainer);
components.set('Row', Row);

const componentFactory = (componentName) => components.get(componentName);

export default componentFactory;
