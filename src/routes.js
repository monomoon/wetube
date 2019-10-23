//global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";
//videos

const VIDEOS = "/videos"; //app.js에 import
const UPLOAD = "/upload"; 
const VIDEO_DETAILS = "/:id"; // videos/:id/...
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

//Api

const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment"

//Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK ="/auth/github/callback"


//facebook 

const FB = "/auth/facebook";
const FB_CALLBACK = "/auth/facebook/callback"

const routes = {
    home: HOME,
    search: SEARCH,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    users: USERS,
    userDetail: (id) => {
        if(id){
            return `/users/${id}`;
        } else {
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    me: ME,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: id => {
        if(id){
            return `/videos/${id}`;
            } else {
            return VIDEO_DETAILS;
            }
        },
    editVideo: id => {
        if(id) {
            return `/videos/${id}/edit`;
        } else {
            return EDIT_VIDEO;
        }
    },
    deleteVideo: id => {
        if(id){
            return `/videos/${id}/delete`;
        }else{
            return DELETE_VIDEO;
        }
    },
    github: GITHUB,
    githubCallback: GITHUB_CALLBACK,
    facebook:FB,
    facebookCallback: FB_CALLBACK,
    api:API,
    registerView:REGISTER_VIEW,
    addComment: ADD_COMMENT
};

export default routes;

