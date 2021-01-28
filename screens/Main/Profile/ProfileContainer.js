import React, { useEffect } from "react";

import ProfilePresenter from "./ProfilePresenter";

export default ({
  getFollowee,
  getFollower,
  followees,
  followers,
  user,
  token,
  getMyPost,
  myPost,
  getMe,
  likes,
  loadingMyPost,
}) => {
  useEffect(() => {
    getFollowee();
  }, []);
  useEffect(() => {
    getFollower();
  }, []);
  useEffect(() => {
    getMyPost(user.id);
  }, []);
  useEffect(() => {
    getMyPost(user.id);
  }, [likes]);
  useEffect(() => {
    getMe();
  }, []);

  return (
    <ProfilePresenter
      user={user}
      followees={followees}
      followers={followers}
      myPost={myPost}
      token={token}
      myPostLength={myPost.length === 0 ? 0 : myPost[0].my_posts_length}
      loadingMyPost={loadingMyPost}
    />
  );
};
