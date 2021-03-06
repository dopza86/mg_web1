import { createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { useNavigation } from "@react-navigation/native";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    explore: {
      page: 1,
      posts: [],
    },
    likes: [],
    comments: [],
    commentsPage: 1,
    filtered: [],
    filteredPage: 1,
    loading: true,
    addPhoto: [],
    post: [],
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
    setPost(state, action) {
      const { payload } = action;
      state.post = payload;
      state.loading = false;
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
    increaseCommentsPage(state, action) {
      state.commentsPage += 1;
    },
    setComments(state, action) {
      const { payload } = action;

      if (payload.commentsPage === 1) {
        state.comments = payload.data;
        state.commentsPage = 1;
      } else {
        state.comments = [...state.comments, ...payload.data];
      }
    },
    createComment(state, action) {
      const {
        payload: { data },
      } = action;

      state.comments = [data, ...state.comments];
    },

    removeComment(state, action) {
      const {
        payload: { commentId },
      } = action;

      const comment = state.comments.find(
        (comment) => comment.id === commentId
      );

      if (comment) {
        state.comments = state.comments.filter(
          (comment) => comment.id !== commentId
        );
        alert("삭제되었습니다.");
      } else {
        alert("삭제할수없습니다");
      }
    },
    putComment(state, action) {
      const {
        payload: { data },
      } = action;
      const comment = state.comments.find((comment) => comment.id === data.id);
      state.comments.splice(state.comments.indexOf(comment), 1, data);
      // state.comments = [data, ...state.comments];
    },
    setFilterPost(state, action) {
      const {
        payload: { results },
      } = action;

      state.filtered = results;
    },
    clearFilterPost(state) {
      state.filtered = [];
    },
    setLoadingTrue(state) {
      state.loading = true;
    },
    setLoadingFalse(state) {
      state.loading = false;
    },
    setAddPhoto(state, action) {
      state.addPhoto = [];
      const { payload } = action;

      state.addPhoto = [...payload];
    },
    setCleanPhoto(state, action) {
      state.addPhoto = [];
    },
  },
});

export const {
  setExplorePosts,
  increasePage,
  setLikes,
  setLike,
  setComments,
  createComment,
  increaseCommentsPage,
  removeComment,
  putComment,
  setFilterPost,
  clearFilterPost,
  loading,
  setLoadingTrue,
  setLoadingFalse,
  setAddPhoto,
  setCleanPhoto,
  setPost,
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

export const getPost = (postId) => async (dispatch, getState) => {
  try {
    dispatch(setLoadingTrue());
    const { data } = await api.post(postId);

    dispatch(setPost(data));
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
    const data = await api.handleLike(postId, pk, token);
  } catch (e) {
    console.warn(e);
  }
};

export const getComment = (postId, commentsPage) => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await api.seeComment(postId, commentsPage);
    dispatch(setComments({ data, commentsPage }));
  } catch (e) {
    console.warn(e);
  }
};

const isFormValid = (comment) => {
  if (comment === "") {
    alert("댓글을 입력 해주세요");
    return false;
  }

  return true;
};

export const addComment = (postId, comment) => async (dispatch, getState) => {
  const {
    usersReducer: { token },
  } = getState();

  if (!isFormValid(comment)) {
    return;
  }

  const form = {
    text: comment,
  };

  try {
    const { data, status } = await api.goComment(postId, form, token);

    if (status === 201) {
      alert("댓글이 등록되었습니다");
      dispatch(createComment({ postId, data }));
    }
  } catch (e) {
    console.warn(e);
  }
};

export const deleteComment = (commentId, token) => async (
  dispatch,
  getState
) => {
  const deleteConfirm = confirm("댓글을 삭제하시겠습니까?");
  if (deleteConfirm) {
    const data = await api.deleteComment(commentId, token);
    dispatch(removeComment({ commentId }));
  } else {
    return;
  }
};

export const editComment = (commentId, text, token, postId) => async (
  dispatch,
  getState
) => {
  const form = {
    text: text,
    post: postId,
  };
  if (text === "") {
    alert("수정할 내용을 입력하세요");
    return;
  }
  const editConfirm = confirm("댓글을 수정하시겠습니까?");
  if (editConfirm) {
    const { status, data } = await api.editComment(commentId, form, token);

    if (status === 200) {
      alert("수정되었습니다");
      dispatch(putComment({ data }));
    } else {
      alert("수정할 수 없습니다");
    }
  } else {
    return;
  }
};

export const searchPost = (form, token, page) => async (dispatch, getState) => {
  dispatch(setLoadingTrue());
  try {
    const {
      data: { results },
    } = await api.search(form, token, page);
    console.log(results);
    if (results.length === 0) {
      alert("검색 결과가 없습니다");
    } else {
      dispatch(setFilterPost({ results, page }));
    }
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(setLoadingFalse());
  }
};

export const writePhoto = (data) => async (dispatch, getState) => {
  dispatch(setAddPhoto(data));
};
export const CleanPhoto = () => async (dispatch, getState) => {
  dispatch(setCleanPhoto());
};

export const writePost = (tags, caption, location) => async (
  dispatch,
  getState
) => {
  const {
    usersReducer: { token },
    postsReducer: { addPhoto },
  } = getState();

  const tag = tags.split(",");
  const newArr = tag.filter((element, i) => element !== "");

  const form = {
    tags: newArr,
    caption: caption,
    location: location,
  };

  try {
    const {
      data: { id },
      status,
    } = await api.updatePost(form, token);

    if (status === 201) {
      var i;
      for (i = 0; i < addPhoto.length; i++) {
        const form = { file: addPhoto[i], post: id };

        const data = await api.updatePhotos(form, token);
      }
      alert("등록!");
      dispatch(setCleanPhoto());
    } else {
      alert("등록할수없습니다");
    }
  } catch (e) {
    console.warn(e);
  }
};

export default postsSlice.reducer;
