import { fetch } from "./csrf.js";

const SET_ALL_POSTS = "posts/setPosts";
const CREATE_POST = "post/createPost";

// Action creator that produces object
const setPosts = (posts) => {
    return {
        type: SET_ALL_POSTS,
        posts: posts,
    };
};

// Action creator that produces object
const createPost = (post) => {
    return {
        type: CREATE_POST,
        post,
    };
};

// Action creator that produces a function
// thunk action
export const fetchAllPosts = () => {
    return async (dispatch) => {
        // You interact with your server.
        const res = await fetch("/api/dashboard");
        dispatch(
            setPosts(res.data)
        );
    };
};

// Action creator that produces a function
// thunk action
export const submitPost = (newPost) => {
    return async (dispatch) => {
        // You interact with your server.
        const res = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify(newPost)
        });
        dispatch(
            createPost(res.data)
        );
    };
};

const initialState = [];

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_ALL_POSTS:
            newState = { ...state, posts: action.posts };
            return newState;
        case CREATE_POST:
            newState = { ...state, post: action.post };
            return newState;
        default:
            return state;
    }
}

export default reducer;