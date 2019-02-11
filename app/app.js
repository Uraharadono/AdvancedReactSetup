import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// routes part
// import routes from "./routes";

import App from './containers/App/index';

const render = (Component) => {
    ReactDOM.render(
        <Component />,
        document.getElementById('app')
    );
};

// ReactDOM.render(<App />, document.getElementById("app"));

// modules.hot.accept does not accept dynamic dependencies,
// have to be constants at compile-time
if (module.hot) module.hot.accept('./containers/App/index', () => {
        const NextApp = require('./containers/App/index').default; // eslint-disable-line global-require
        render(NextApp);
    });

render(App);
