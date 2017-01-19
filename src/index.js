import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory, Router } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from './routes';
//import { Router, Route, browserHistory, IndexRoute } from 'react-router';
//import { App,Home,Login,Register,Post,Admin } from 'containers';
//const rootElement = document.getElementById('root');

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

injectTapEventPlugin();

ReactDom.render((
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={browserHistory} routes={routes} />
        </MuiThemeProvider>
    </Provider>), document.getElementById('root'));
/*
ReactDOM.render(

        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/post" component={Post}/>
                <Route path="/admin" component={Admin}/>
            </Route>
        </Router>
    , rootElement

);
*/
 