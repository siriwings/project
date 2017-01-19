import React,{Component, PropTypes} from 'react';
import { Header } from 'components';

const App = ({ children }) => (
    <div>
        <div>
            <Header/>
        </div>
        <div>
            {children}
        </div>
    </div>
);

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;


