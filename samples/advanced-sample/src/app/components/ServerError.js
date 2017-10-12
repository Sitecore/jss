import React from 'react';
import { commonComponent } from 'enhancers';

import { Link } from 'react-router-dom';

const ServerError = () => (
  <section style={{ paddingTop: 50 }}>
    <h1>500!</h1>
    <div><img alt="500 error" src="https://c.fastcompany.net/multisite_files/fastcompany/imagecache/inline-large/inline/2014/02/3026604-inline-i-teehanlax.jpg" /></div>
    <Link to="/">Home</Link>
  </section>
);

export default commonComponent(ServerError);
