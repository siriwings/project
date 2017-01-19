/**
 * Created by siri on 2017-01-11.
 */
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Card, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

const EditForm = ({
    onEdit,
    onChange,
    onChecked,
    contents,
    checkedvalue
}) => (

    <Card className="container write">
        <div className="card">
            <div className="card-content">
                        <textarea
                            className="materialize-textarea"
                            placeholder="Write down your memo"
                            value={contents}
                            onChange={onChange}></textarea>
            </div>
            <div style={styles.block}>
                <Checkbox
                    id = "publish"
                    label="Publish"
                    onClick={onChecked}
                    checked={checkedvalue}
                    style={styles.checkbox}
                />
            </div>
            <div className="card-action">
                <a onClick={onEdit}>Edit</a>
            </div>
        </div>
    </Card>
);
EditForm.propTypes = {
    onEdit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onChecked :PropTypes.func.isRequired,
    checkedvalue : PropTypes.bool.isRequired,
    contents: PropTypes.string.isRequired
};

export default EditForm;
