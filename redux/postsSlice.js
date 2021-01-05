import { createSlice } from "@reduxjs/toolkit";
import api from "../api";
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    explore: {
      page: 1,
      posts: [],
    },
    likes: [],
    comments: [],
  },
  reducers: {
    setExplorePosts(state, action) {
      const { payload } = action;
      if (payload.page === 1) {
        state.explore.posts = payload.posts;
        state.explore.page = 1;
      } else {
        state.explore.posts = [...state.explore.posts, ...payload.posts];
      }
    },

    increasePage(state, action) {
      state.explore.page += 1;
    },
    setLikes(state, action) {
      if (action.payload.likesPage === 1) {
        state.likes = action.payload.likes.results;
        state.likesPage = 1;
      } else {
        state.likes = [...state.likes, ...action.payload.likes.results];
      }
    },
    increaseLikesPage(state, action) {
      state.likesPage += 1;
    },
    setLike(state, action) {
      const {
        payload: { postId },
      } = action;
      const post = state.explore.posts.find((post) => post.id === postId);
      if (post) {
        if (post.is_liked) {
          post.is_liked = false;
          state.likes = state.likes.filter((post) => post.id !== postId);
          alert("좋아요를 취소했습니다");
        } else {
          post.is_liked = true;
          state.likes = [post, ...state.likes];
          alert("좋아요!");
        }
      }
    },
    addComment(state, action) {
      const {
        payload: { postId, text },
      } = action;

      const post = state.explore.posts.find((post) => post.id === postId);
      if (post) {
        state.comments = [text, ...state.comments];
        alert("댓글을 등록했습니다");
      }
    },
    deleteComment(state, action) {
      const {
        payload: { commentId },
      } = action;
      const comment = state.explore.comments.find(
        (comment) => comment.id === commentId
      );
      if (comment) {
        state.comments = state.comments.filter(
          (comment) => comment.id !== commentId
        );
      }
    },
  },
});

export const {
  setExplorePosts,
  increasePage,
  setLikes,
  setLike,
  addComment,
  deleteComment,
} = postsSlice.actions;

export const getPosts = (page) => async (dispatch, getState) => {
  const {
    usersReducer: { token },
  } = getState();

  try {
    const {
      data: { results },
    } = await api.posts(page, token);

    dispatch(
      setExplorePosts({
        posts: results,
        page,
      })
    );
  } catch (e) {
    console.warn(e);
  }
};

export const toggleLike = (postId) => async (dispatch, getState) => {
  const {
    usersReducer: { pk, token },
  } = getState();
  dispatch(setLike({ postId }));

  try {
    await api.handleLike(postId, pk, token);
  } catch (e) {
    console.warn(e);
  }
};

export const getComment = (postId) => async (dispatch, getState) => {
  try {
    const { data } = await api.getComment(postId);
  } catch (e) {
    console.warn(e);
  }
};

export default postsSlice.reducer;