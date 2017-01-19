/**
 * Created by siri on 2017-01-11.
 */
import App from 'App';
import { Home,Login, Register, Post, Admin,Edit } from 'containers';

//import Register from './containers/Register';
//import Login from './containers/Login';
//import Home from './containers/Home';
//import Post from './containers/Post';
//import Admin from './containers/Admin';

import Auth from './modules/Auth';
//import { Router, Route, browserHistory, IndexRoute } from 'react-router';



const routes = {
    // base component (wrapper for the whole application).
    component: App,
    childRoutes: [

        {
            path: '/',
            component: Home
        },

        {
            path: '/login',
            component: Login
        },

        {
            path: '/signup',
            component: Register
        },
        {
            path: '/post',
            component: Post
        },
        {
            path: '/edit/:index/:id',
           // path:'/edit',
            component: Edit
        },
        {
            path: '/admin',
            component: Admin
        },
        {
            path: '/logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();

                // change the current URL to /
                replace('/');
            }
        }


    ]
};

export default routes;