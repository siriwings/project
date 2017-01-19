import React, {PropTypes} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Auth from '../modules/Auth';


const HomeForm = () => (
    <div>
        <h1>HomeForm의 home page</h1>
    </div>

);

HomeForm.propTypes = {
    secretData: PropTypes.string.isRequired
};

export default HomeForm;