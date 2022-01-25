import { combineActions } from 'redux-actions';

export const getType = (actionRedux) => {
    return actionRedux().type;
};

export const getPosts = combineActions({
    getPostsRequest: undefined,
    getPostsSuccess: (payload) => payload,
    getPostsFailure: (err) => err,
});
