import React, {Component} from 'react';
import {ArticleList} from 'components';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import {articleListRequest, articleRemoveRequest, articlePublishRequest} from 'actions/article';

class Admin extends Component {
    constructor(props) {
        super(props);

        this.loadNewMemo = this.loadNewMemo.bind(this);
        this.loadOldMemo = this.loadOldMemo.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handlePublish = this.handlePublish.bind(this);

        this.state = {
            loadingState: false
        };

    }

    componentDidMount() {

        $(".dropdown-button").dropdown({
            belowOrigin: true // Displays dropdown below the button
        });

        /*
         // LOAD NEW MEMO EVERY 5 SECONDS
         const loadMemoLoop = () => {
         this.loadNewMemo().then(
         () => {
         this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 5000);
         }
         );
         };
         */

        const loadUntilScrollable = () => {
            // IF THE SCROLLBAR DOES NOT EXIST,
            if ($("body").height() < $(window).height()) {
                //this.loadNewMemo();
                this.loadOldMemo().then(
                    () => {
                        // DO THIS RECURSIVELY UNLESS IT'S LAST PAGE
                        if (!this.props.isLast) {
                            loadUntilScrollable();
                        }
                    }
                );
            }
        };


        this.props.articleListRequest(true, undefined, undefined, this.props.user).then(
            () => {
                setTimeout(loadUntilScrollable, 1000);
                // loadMemoLoop();
                this.setState({
                    initiallyLoaded: true
                });

            }
        );

        $(window).scroll(() => {
            // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
            if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
                if (!this.state.loadingState) {
                    //this.loadNewMemo();
                    this.loadOldMemo();
                    this.setState({
                        loadingState: true
                    });
                }
            } else {
                if (this.state.loadingState) {
                    this.setState({
                        loadingState: false
                    });
                }
            }
        });
    }

    componentWillUnmount() {
        // STOPS THE loadMemoLoop
        //clearTimeout(this.memoLoaderTimeoutId);
        // REMOVE WINDOWS SCROLL LISTENER
        $(window).unbind();

        this.setState({
            initiallyLoaded: false
        });

    }

    componentDidUpdate(prevProps, prevState) {

        $('.dropdown-button').dropdown({
            belowOrigin: true // Displays dropdown below the button
        });

        if (this.props.user !== prevProps.user) {
            this.componentWillUnmount();
            this.componentDidMount();
        }

    }


    loadNewMemo() {
        // CANCEL IF THERE IS A PENDING REQUEST
        if (this.props.listStatus === 'WAITING')
            return new Promise((resolve, reject) => {
                resolve();
            });

        // IF PAGE IS EMPTY, DO THE INITIAL LOADING
        if (this.props.articleData.length === 0)
            return this.props.articleListRequest(true);

        return this.props.articleListRequest(false, 'new', this.props.articleData[0]._id, this.props.user);
    }

    loadOldMemo() {
        // CANCEL IF USER IS READING THE LAST PAGE
        if (this.props.isLast) {
            return new Promise(
                (resolve, reject) => {
                    resolve();
                }
            );
        }

        // GET ID OF THE MEMO AT THE BOTTOM
        let lastId = this.props.articleData[this.props.articleData.length - 1]._id;

        // START REQUEST
        return this.props.articleListRequest(false, 'old', lastId, this.props.user).then(() => {
            // IF IT IS LAST PAGE, NOTIFY
            if (this.props.isLast) {
                Materialize.toast('You are reading the last page', 2000);
            }
        });
    }

    handleRemove(id,index) {
        this.props.articleRemoveRequest(id, index).then(() => {
            if (this.props.removeStatus.status === "SUCCESS") {
                // LOAD MORE MEMO IF THERE IS NO SCROLLBAR
                // 1 SECOND LATER. (ANIMATION TAKES 1SEC)
                setTimeout(() => {
                    if ($("body").height() < $(window).height()) {
                        this.loadOldMemo();
                    }
                }, 1000);
            } else {
                // ERROR
                /*
                 DELETE MEMO: DELETE /api/memo/:id
                 ERROR CODES
                 1: INVALID ID
                 2: NOT LOGGED IN
                 3: NO RESOURCE
                 4: PERMISSION FAILURE
                 */
                let errorMessage = [
                    'Something broke',
                    'You are not logged in',
                    'That memo does not exist',
                    'You do not have permission'
                ];

                // NOTIFY ERROR
                let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.removeStatus.error - 1] + '</span>');
                Materialize.toast($toastContent, 2000);


                // IF NOT LOGGED IN, REFRESH THE PAGE
                if (this.props.removeStatus.error === 2) {
                    setTimeout(() => {
                        location.reload(false)
                    }, 2000);
                }
            }
        });
    }

    handlePublish(id) {
        this.props.articlePublishRequest(id).then(() => {

            //아래 방법 말고 다른 방법을 찾아야함...
            if (this.props.publishStatus.status === "SUCCESS") {
              //  this.props.articleListRequest(true);
            }
        });
    }

    render() {

        return (
            <div className="wrapper">
                <h1>aaa</h1>
                <ArticleList onRemove={this.handleRemove}
                             onPublish={this.handlePublish}
                             data={this.props.articleData}
                             currentUser={this.props.user}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postStatus: state.article.post,
        user: state.authentication.user,
        articleData: state.article.list.data,
        listStatus: state.article.list.status,
        isLast: state.article.list.isLast,
        publishStatus: state.article.publish,
        removeStatus: state.article.remove
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        articleListRequest: (isInitial, listType, id, username) => {
            return dispatch(articleListRequest(isInitial, listType, id, username));
        },
        articleRemoveRequest: (id, index) => {
            return dispatch(articleRemoveRequest(id, index));
        },
        articlePublishRequest: (id) => {
            return dispatch(articlePublishRequest(id));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

