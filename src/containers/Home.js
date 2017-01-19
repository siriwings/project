import React, {Component} from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import {connect} from 'react-redux';
import {HomeList} from 'components';
import {HomeForm} from 'components';
import {homeListRequest} from 'actions/article';

class Home extends Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);
        this.loadNewMemo = this.loadNewMemo.bind(this);
        this.loadOldMemo = this.loadOldMemo.bind(this);
        this.state = {
            secretData: '',
            loadingState: false,
            initiallyLoaded: false
        };
    }

    shouldComponentUpdate(nextProps, nextState){
        return (JSON.stringify(nextProps) != JSON.stringify(this.props));
    }



    componentDidMount() {
        /*
        console.log("home-componentDidMount");
        axios.get('/api/article', {
            headers: {'Authorization': `bearer ${Auth.getToken()}`}
        })
            .then((response) => {
                this.setState({
                    secretData: response.data.message
                });

                if (Auth.isUserAuthenticated()) {
                    let $toastContent = $('<span style="color: #FFB4BA">' + response.data.message + '</span>');
                    Materialize.toast($toastContent, 2000);
                }
            });
        console.log("home-componentDidMount2");
*/
        this.props.homeListRequest(true).then(
            () => {
                setTimeout(loadUntilScrollable, 1000);
                loadMemoLoop();
                this.setState({
                    initiallyLoaded: true
                });

            }
        );

        // LOAD NEW MEMO EVERY 5 SECONDS
        const loadMemoLoop = () => {
            this.loadNewMemo().then(
                () => {
                    this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 5000);
                }
            );
        };

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
        clearTimeout(this.memoLoaderTimeoutId);
        // REMOVE WINDOWS SCROLL LISTENER
        $(window).unbind();

        this.setState({
            initiallyLoaded: false
        });

    }

    componentDidUpdate(prevProps, prevState) {
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
            return this.props.homeListRequest(true);

        return this.props.homeListRequest(false, 'new', this.props.articleData[0]._id, this.props.user);
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
        return this.props.homeListRequest(false, 'old', lastId, this.props.user).then(() => {
            // IF IT IS LAST PAGE, NOTIFY
            if (this.props.isLast) {
                Materialize.toast('You are reading the last page', 2000);
            }
        });
    }

    render() {
        return (
            <div>
                <HomeList data={this.props.articleData}
                          currentUser={this.props.user}
                />
            </div>
        );
    }

    /*
     render() {
     return (
     <div>
     {Auth.isUserAuthenticated() ? (
     <HomeList data={this.props.articleData}
     currentUser={this.props.user}
     />
     ) : (<HomeForm/>)
     }
     </div>
     );
     }
     */
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user,
        articleData: state.article.home.data,
        listStatus: state.article.home.status,
        isLast: state.article.home.isLast,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        homeListRequest: (isInitial, listType, id, username) => {
            return dispatch(homeListRequest(isInitial, listType, id, username));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)
