import PageTwo from './containers/PageTwo/index';
import App from './containers/App/index';


const routes = [
    {
        path: '/',
        exact: true,
        component: App,
        prettyComponentName: 'Home'
    },
    {
        path: '/page-two',
        exact: false,
        component: PageTwo,
        prettyComponentName: 'Page two'
    }
];

export default routes;
