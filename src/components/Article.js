/**
 * Created by siri on 2017-01-11.
 */
import React, {PropTypes} from 'react';
import TimeAgo from 'react-timeago';
import {Link} from 'react-router';

const dropDownMenu = (data, onRemove, onPublish, index) => (

    <div className="option-button">
        <a className='dropdown-button'
           id={`dropdown-button-${data._id}`}
           data-activates={`dropdown-${data._id}`}>
            <i className="material-icons icon-button">more_vert</i>
        </a>
        <ul id={`dropdown-${data._id}`} className='dropdown-content'>
            { data.publish ?
                <li><a onClick={() => {
                    onPublish(data._id);
                }}>Disabled</a></li>
                : <li><a onClick={() => {
                    onPublish(data._id);
                }}>Published</a></li>
            }
            <li><Link to={`/edit/${index}/${data._id}`}>Edit</Link></li>
            <li><a onClick={() => {
                onRemove(data._id, index);
            }}>Remove</a></li>
        </ul>
    </div>
);

const ArticleView = ({
    data
    , ownership
    , onRemove
    , onPublish
    , index
}) => (
    <div className="card">
        <div className="info">
            <a className="username">{data.writer}</a> wrote a log · <TimeAgo date={data.date.created}/>
            { ownership ? dropDownMenu(data, onRemove, onPublish, index) : undefined }
        </div>
        <div className="card-content">
            {data.contents}
        </div>
    </div>);

const Article = ({
    data
    , ownership
    , onRemove
    , onPublish
    , index
}) => (
    <div className="container memo">
        {ArticleView({data, ownership, onRemove, onPublish, index})}
    </div>
);

/*
 const Article = ({data, ownership}) => (
 <div className="container memo">
 <ArticleView data={data} ownership={ownership}/>
 </div>
 );
 */
/*
 Article.propTypes = {
 data: PropTypes.object,
 //ownership prop  은 해당 메모가 자신의 메모인지 아닌지 여부를 확인하는 값
 ownership: PropTypes.bool
 };

 Article.defaultProps = {
 data: {
 _id: 'id1234567890',
 writer: 'Writer',
 contents: 'Contents',
 is_edited: false,
 date: {
 edited: new Date(),
 created: new Date()
 },
 starred: []
 },
 ownership: true
 }
 */


export default Article;