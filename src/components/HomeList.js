import React, {PropTypes} from 'react';
import {Article} from 'components';

const HomeList = ({
    data
    , currentUser
}) => {
    const mapToComponents = data => {
        return data.map((article, i) => {
            return (<Article
                data={article}
                key={article._id}
                index={i}
            />);
        });
    };

    return (<div>{mapToComponents(data)}</div>);
}
HomeList.propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string
};

HomeList.defaultProps = {
    data: [],
    currentUser: ''
};


export default HomeList;