import React from 'react';
import { SitecoreContext, Placeholder } from '@sitecore-jss/sitecore-jss-react';
import componentFactory from '../componentFactory';

import 'assets/css/app.css';

const App = ({sitecoreState}) =>
    <SitecoreContext componentFactory={componentFactory}>
        <Placeholder name="main" rendering={sitecoreState.sitecore.route} context={sitecoreState.sitecore.context} />
    </SitecoreContext>
    
export default App;