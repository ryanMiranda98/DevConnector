import axios from "axios";
import { setAlert } from "./alertActions";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POSTS,
  ADD_POST,
  GET_POST,
} from "./types";

// Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/posts");
    dispatch({ type: GET_POSTS, payload: res.data.posts });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      //   payload: {
      //     msg: error.response.statusText,
      //     status: error.response.status,
      //   },
    });
  }
};

// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/like/${postId}`
    );
    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      //   payload: {
      //     msg: error.response.statusText,
      //     status: error.response.status,
      //   },
    });
  }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/unlike/${postId}`
    );
    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      //   payload: {
      //     msg: error.response.statusText,
      //     status: error.response.status,
      //   },
    });
  }
};

// Delete posts
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/posts/${postId}`);
    dispatch({ type: DELETE_POSTS, payload: postId });
    dispatch(setAlert("Post removed", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      //   payload: {
      //     msg: error.response.statusText,
      //     status: error.response.status,
      //   },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:5000/api/posts`,
      formData,
      config
    );
    console.log(res);
    dispatch({ type: ADD_POST, payload: res.data });
    dispatch(setAlert("Post created", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      //   payload: {
      //     msg: error.response.statusText,
      //     status: error.response.status,
      //   },
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  console.log("action", id);
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
    console.log(res);
    dispatch({ type: GET_POST, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      //   payload: {
      //     msg: error.response.statusText,
      //     status: error.response.status,
      //   },
    });
  }
};
