import React, { useState } from "react";
import styled from "styled-components/native";
import PostCard from "../../../components/PostCard";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../../api";
import CommentPresenter from "../../../components/CommentPresenter";
import { useDispatch } from "react-redux";
import { addComment } from "../../../redux/postsSlice";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadMore = styled.View`
  width: 100%;
  padding: 10px 10px;
  align-items: center;
  background-color: #006a70;
  border-radius: 5px;
  margin-bottom: 30px;
`;
const Touchable = styled.TouchableOpacity``;
const LoadMoreText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

const CommentCount = styled.Text`
  margin-left:10px
  margin-bottom:15px
  opacity: 0.7;
  box-shadow: 0px 1px rgba(200, 200, 200, 0.5);
  padding: 10px 20px;
`;

export default ({ posts, increasePage, token, commentsPage }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [comment, setComments] = useState("");
  const [postId, setPostId] = useState("");
  const onSubmit = (postId, comment, post, token) => {
    dispatch(addComment(postId, comment));
    setComments("");
    navigation.navigate("CommentDetail", { post, token });
  };

  return (
    <Container>
      {posts.length === 0 ? (
        <ActivityIndicator color="black" />
      ) : (
        <>
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{ paddingTop: 30 }}
          >
            {posts.map((post) => (
              <>
                <PostCard
                  key={post.id}
                  id={post.id}
                  user={post.user}
                  avatar={post.user.avatar}
                  photos={post.photos}
                  name={post.name}
                  postObj={post}
                  caption={post.caption}
                  location={post.location}
                  created={post.created}
                  isLiked={post.is_liked}
                  like_count={post.like_list ? post.like_list.count_users : 0}
                />
                {/* <CommentPresenter
                  comment={comment}
                  setComments={setComments}
                  addComment={() => dispatch(addComment(post.id, comment))}
                /> */}
                {post.comment_list.length === 0 ? (
                  <CommentPresenter
                    comment={comment.value}
                    setComments={setComments}
                    addComment={() => onSubmit(post.id, comment, post, token)}
                  />
                ) : (
                  <Touchable
                    onPress={() =>
                      navigation.navigate("CommentDetail", { post, token })
                    }
                  >
                    <CommentCount>
                      {post.comment_list.length}개의 댓글더보기...
                    </CommentCount>
                  </Touchable>
                )}
              </>
            ))}
          </ScrollView>
        </>
      )}
    </Container>
  );
};
