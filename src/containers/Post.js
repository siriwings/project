import React,{Component,PropTypes} from 'react';
import { PostForm } from 'components';
import { connect } from 'react-redux';
import { articlePostRequest } from 'actions/article';


class Post extends Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            contents: '',
            publish:false
        };

        this.handlePost = this.handlePost.bind(this);
        this.changeArticle = this.changeArticle.bind(this);
        this.changePublish = this.changePublish.bind(this);
    }

    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */
    changeArticle(event) {
        this.setState({
            contents: event.target.value
        });
    }
    changePublish(event) {
            this.setState({
                publish: event.target.checked
            });
    }

    /**
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    handlePost(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        const user = this.props.user;
        //console.log(user);
        const contents = this.state.contents;
        const publish = this.state.publish;
        return this.props.articlePostRequest(user,contents,publish).then(
            () => {
                if(this.props.postStatus.status === "SUCCESS") {
                    // TRIGGER LOAD NEW MEMO
                    // TO BE IMPLEMENTED
                    Materialize.toast('Success!', 2000);

                    this.setState({
                        contents: ''
                    });

                } else {
                    /*
                     ERROR CODES
                     1: NOT LOGGED IN
                     2: EMPTY CONTENTS
                     */
                    let $toastContent;
                    switch(this.props.postStatus.error) {
                        case 1:
                            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                            $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                            Materialize.toast($toastContent, 2000);
                            setTimeout(()=> {location.reload(false);}, 2000);
                            break;
                        case 2:
                            $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                        default:
                            $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                    }
                }
            }
        );
    }

    render() {
        return (
            <PostForm
                onPost={this.handlePost}
                onChange={this.changeArticle}
                contents={this.state.contents}
                onChecked={this.changePublish}
            />
        );

    }
}

const mapStateToProps = (state) => {
    return {
        //isLoggedIn: state.authentication.status.isLoggedIn,
        user:state.authentication.user,
        postStatus: state.article.post
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        articlePostRequest: (username,contents,publish) => {
            return dispatch(articlePostRequest(username,contents,publish));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);




