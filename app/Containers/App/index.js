/* eslint-disable react/jsx-one-expression-per-line */
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
                    <h4>There are 2 menus for a reason to show 2 different way to approach routing.</h4>
                    <h5> In point they are the same. NavLink allows us to set
                        <strong> activeClassName </strong>
                        property, so we can easily appy class to highlight current page.
                    </h5>
                    <hr></hr>
                    <h4>
                        <strong>NOTE:</strong>
                        Currently set routes are bad way to handle this. I am referencing Home method as this component, which could cause Circular dependency.
                    </h4>
                    <h4>In best practice way &quot;/&quot; would lead to other component.</h4>

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
