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

const PostForm = ({
    onPost,
    onChange,
    contents,
    onChecked
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
                    style={styles.checkbox}
                />
            </div>
            <div className="card-action">
               <a onClick={onPost}>Post</a>
            </div>
        </div>
    </Card>
);
PostForm.propTypes = {
    onPost: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    //errors: PropTypes.object.isRequired,
    contents: PropTypes.string.isRequired
};

export default PostForm;