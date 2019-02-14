import PageTwo from './containers/PageTwo/index';
import Home from './containers/Home/index';


const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
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
