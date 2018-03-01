import React from "react";
import { Placeholder } from "@sitecore-jss/sitecore-jss-react";
import Navigation from "./components/Navigation";
import ContextItem from "./components/ContextItem";

import css from "assets/css/default.css";

// The root of the application. If you're a Sitecore developer,
// this is similar to a Sitecore Layout, but just the part inside <body>

export default ({ route }) => (
  <div>
    <Navigation />
    <div id="CenterColumn">
      <div id="InnerCenter">
        <Placeholder name="main" rendering={route} />
        <ContextItem />
      </div>
    </div>
  </div>
);
