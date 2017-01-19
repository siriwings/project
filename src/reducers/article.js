import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    }
    , list: {
        status: 'INIT',
        data: [],
        isLast: false
    }
    ,home: {
        status: 'INIT',
        data: [],
        isLast: false}
    , remove: {
        status: 'INIT',
        error: -1
    }
    , publish:{
        status:'INIT',
        error:-1
    },
    edit: {
        status: 'INIT',
        error: -1
    }
};

export default function article(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }

    switch (action.type) {
        case types.ARTICLE_POST:
            return update(state, {
                post: {
                    status: {$set: 'WAITING'},
                    error: {$set: -1}
                }
            });
        case types.ARTICLE_POST_SUCCESS:
            return update(state, {
                post: {
                    status: {$set: 'SUCCESS'}
                }
            });
        case types.ARTICLE_POST_FAILURE:
            return update(state, {
                post: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error}
                }
            });
        /*EDIT*/
        case types.ARTICLE_EDIT:
            return update(state, {
                edit: {
                    status: {$set: 'WAITING'},
                    error: {$set: -1}
                   // , memo: {$set: undefined}
                }
            });
        case types.ARTICLE_EDIT_SUCCESS:
            return update(state, {
                edit: {
                    status: {$set: 'SUCCESS'},
                },
                list: {
                    data: {
                        [action.index]: {$set: action.article}
                    }
                }
            });
        case types.ARTICLE_EDIT_FAILURE:
            return update(state, {
                edit: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error}
                }
            });

        /*article List*/
        case types.ARTICLE_LIST:
            return update(state, {
                list: {
                    status: {$set: 'WAITING'},
                }
            });
        case types.ARTICLE_LIST_SUCCESS:
            if (action.isInitial) {
                return update(state, {
                    list: {
                        status: {$set: 'SUCCESS'},
                        data: {$set: action.data},
                        isLast: {$set: action.data.length < 6}
                    }
                });
            }


            if (action.listType === 'new') {
                return update(state, {
                    list: {
                        status: {$set: 'SUCCESS'},
                        data: {$unshift: action.data}
                    }
                });
            }

            return update(state, {
                list: {
                    status: {$set: 'SUCCESS'},
                    data: {$push: action.data},
                    isLast: {$set: action.data.length < 6}
                }
            });

        case types.ARTICLE_LIST_FAILURE:
            return update(state, {
                list: {
                    status: {$set: 'FAILURE'}
                }
            });

        /*HOME LIST*/
        case types.HOME_LIST:
            return update(state, {
                home: {
                    status: {$set: 'WAITING'},
                }
            });
        case types.HOME_LIST_SUCCESS:
            if (action.isInitial) {
                return update(state, {
                    home: {
                        status: {$set: 'SUCCESS'},
                        data: {$set: action.data},
                        isLast: {$set: action.data.length < 6}
                    }
                });
            }


            if (action.listType === 'new') {
                return update(state, {
                    home: {
                        status: {$set: 'SUCCESS'},
                        data: {$unshift: action.data}
                    }
                });
            }

            return update(state, {
                home: {
                    status: {$set: 'SUCCESS'},
                    data: {$push: action.data},
                    isLast: {$set: action.data.length < 6}
                }
            });

        case types.HOME_LIST_FAILURE:
            return update(state, {
                home: {
                    status: {$set: 'FAILURE'}
                }
            });

        /* ARTICLE PUBLISH */
        case types.ARTICLE_PUBLISH:
            return update(state, {
                publish: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.ARTICLE_PUBLISH_SUCCESS:
            return update(state, {
                publish: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.ARTICLE_PUBLISH_FAILURE:
            return update(state, {
                publish: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        /* MEMO REMOVE */
        case types.ARTICLE_REMOVE:
            return update(state, {
                remove: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.ARTICLE_REMOVE_SUCCESS:
            return update(state, {
                remove:{
                    status: { $set: 'SUCCESS' }
                },
                list: {
                    data: { $splice: [[action.index, 1]] }
                }
            });
        case types.ARTICLE_REMOVE_FAILURE:
            return update(state, {
                remove: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        default:
            return state;
    }
}


