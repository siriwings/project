import React,{Component,PropTypes} from 'react';
import { EditForm } from 'components';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { articleEditRequest } from 'actions/article';

class Edit extends Component {

    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            contents: props.articleData[props.params.index].contents,
            publish:props.articleData[props.params.index].publish
        };

        this.changeArticle = this.changeArticle.bind(this);
        this.changePublish = this.changePublish.bind(this);
        this.handleEdit=this.handleEdit.bind(this);
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

    handleEdit(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        console.log(this.props.params.id);
        const contents = this.state.contents;
        const publish = this.state.publish;
        const id= this.props.params.id;
        const index=this.props.params.index;

        return this.props.articleEditRequest(id,index,contents,publish).then(
            () => {
                if(this.props.editStatus.status === "SUCCESS") {
                    // TRIGGER LOAD NEW MEMO
                    // TO BE IMPLEMENTED
                    Materialize.toast('Your Edit Success!', 2000);

                    browserHistory.push('/admin');

                } else {
                    /*
                     ERROR CODES
                     1: NOT LOGGED IN
                     2: EMPTY CONTENTS
                     */
                    let $toastContent;
                    switch(this.props.editStatus.error) {
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
            <EditForm
                onEdit={this.handleEdit}
                onChange={this.changeArticle}
                onChecked={this.changePublish}
                contents={this.state.contents}
                checkedvalue={this.state.publish}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        //isLoggedIn: state.authentication.status.isLoggedIn,
        user:state.authentication.user,
        editStatus:state.article.edit,
        articleData: state.article.list.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        articleEditRequest: (id,index,contents,publish) => {
            return dispatch(articleEditRequest(id,index,contents,publish));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
