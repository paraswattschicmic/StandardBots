import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Global } from "@emotion/core";
import GridOn from "@material-ui/icons/GridOn";
import FolderOpen from "@material-ui/icons/FolderOpen";
import Root from "./components/layout/Root";
import Header from "./components/layout/Header";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
// import IndexPage from './pages/index'
import normalize from "./styles/normalize";
import globals from "./styles/globals";
import Visualizer from "./pages/Visualizer/index";
import Visualizer2 from "./pages/Visualizer/Visualizer2";

import SideMenu from "./components/layout/SideMenu/SideMenu";
import "./routes.css";

const items = [
  {
    name: "Components",
    label: "Components",
    Icon: FolderOpen,
    expanded: true,
    type: "normal",
    items: [
      {
        name: "visulizer",
        label: "Visulizer",
        Icon: GridOn,
        expanded: true,
        type: "normal",
        items: [
          {
            name: "Robot",
            label: "Robot",
            route: "/",
            type: "route",
            Icon: BookmarkBorderIcon,
          },
          {
            name: "Sphere",
            label: "Sphere",
            route: "/robot2",
            type: "route",
            Icon: BookmarkBorderIcon,
          },
        ],
      },
    ],
  },
];

// If your app is big + you have routes with a lot of components, you should consider
// code-splitting your routes! If you bundle stuff up with Webpack, I recommend `react-loadable`.
//
// $ yarn add react-loadable
// $ yarn add --dev @types/react-loadable
//
// The given `pages/` directory provides an example of a directory structure that's easily
// code-splittable.

const Routes: React.SFC = () => (
  <Root>
    <Global styles={normalize} />
    <Global styles={globals} />
    <Header title="Standard Bots" />
    {/* <div style={{ display: 'flex', width: '100%' }}> */}
    <div className="row main_section">
      <div className="col-md-3 p-0">
        <SideMenu items={items} depth={0} depthStep={10} expanded={false} />
      </div>
      <div className="col-md-9 p-0">
        <Switch>
          <Route exact path="/" component={Visualizer} />

          <Route exact path="/robot2" component={Visualizer2} />
          <Route component={() => <div>Not Found</div>} />
        </Switch>
      </div>
    </div>
    {/* </div> */}
  </Root>
);

export default Routes;
