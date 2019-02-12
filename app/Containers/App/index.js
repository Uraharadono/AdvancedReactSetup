import React from 'react';

// routes part
import {
    BrowserRouter as Router, Route, Link, NavLink
} from 'react-router-dom';
import routes from 'routes';


class App extends React.Component {
    render() {
        const routeComponents = routes.map(({ path, exact, component }, key) => <Route exact={exact} path={path} component={component} key={key} />);
        const routeLinks = routes.map(({ path, prettyComponentName }, key) => (
            <Link to={path} key={key}>
                {prettyComponentName}
            </Link>
        ));
        const routeLinks2 = routes.map(({ path, exact, prettyComponentName }, key) => (
            <NavLink activeClassName="active" exact={exact} to={path} key={key}>
                {prettyComponentName}
            </NavLink>
        ));
        return (

            <Router>
                <div>
                    <nav>
                        {routeLinks}
                    </nav>
                    <nav>
                        {routeLinks2}
                    </nav>
                    {routeComponents}
                </div>
            </Router>
        );
    }
}

export default App;
