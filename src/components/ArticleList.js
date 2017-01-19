import React, {PropTypes} from 'react';
import {Article} from 'components';


const ArticleList = ({
    data
    , currentUser
    , onRemove
    , onPublish
}) => {
    const mapToComponents = data => {
        return data.map((article, i) => {
            //console.log(currentUser);
            return (<Article
                data={article}
                ownership={ (article.writer === currentUser) }
                key={article._id}
                onRemove={onRemove}
                onPublish={onPublish}
                index={i}
            />);
        });
    };

    return (<div>{mapToComponents(data)}</div>);
}

/*
 const ArticleList = ({
 data
 , currentUser
 , onRemove
 , onPublish
 }) => {
 data = data.filter((data) => {
 if (data.writer === currentUser) return data;
 });
 //console.log(filteredData);
 const mapToComponents = data => {
 return data.map((article, i) => {
 //console.log(currentUser);
 return (<Article
 data={article}
 ownership={ (article.writer === currentUser) }
 key={article._id}
 onRemove={onRemove}
 onPublish={onPublish}
 index={i}
 />);
 });
 };

 return (<div>{mapToComponents(data)}</div>);
 }
 */
ArticleList.propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string,
    onRemove: PropTypes.func,
    onPublish: PropTypes.func
};

ArticleList.defaultProps = {
    data: [],
    currentUser: ''
};


export default ArticleList;