import React from "react";
import styled from "styled-components/native";
import { Dimensions, Image, ScrollView } from "react-native";
import SmallPostCard from "../../../components/SmallPostCard";

const { width, height } = Dimensions.get("screen");

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.View`
  width: 90%;
  padding: 15px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
`;
const HeaderPhotoContainer = styled.View``;
const HeaderTextContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity``;

const LargeText = styled.Text`
  font-size: 25px;
  font-weight: 500;
`;
const Text = styled.Text``;
const EditProfileBtn = styled.TouchableOpacity`
  width: 90%;
  height: 35px;
  border: 1px solid grey;
  border-radius: 5;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;
const BtnText = styled.Text`
  font-size: 14px;
  font-weight: 500;
`;
const PostContainer = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;
export default ({ followees, followers, myPost, user }) => {
  return (
    <>
      <ScrollView>
        <Container>
          <HeaderContainer>
            <HeaderPhotoContainer>
              <Image
                style={{ height: 80, width: 80, borderRadius: 100 }}
                source={{ uri: user.avatar }}
              />
              <Text>{user.username}</Text>
              <Text>{user.bio}</Text>
            </HeaderPhotoContainer>
            <HeaderTextContainer>
              <LargeText>{myPost.length}</LargeText>
              <Text>포스트</Text>
            </HeaderTextContainer>
            <HeaderTextContainer>
              <LargeText>{followees.length}</LargeText>
              <Text>팔로워</Text>
            </HeaderTextContainer>
            <HeaderTextContainer>
              <LargeText>{followers.length}</LargeText>
              <Text>팔로잉</Text>
            </HeaderTextContainer>
          </HeaderContainer>
          <EditProfileBtn>
            <BtnText>프로필 수정</BtnText>
          </EditProfileBtn>
        </Container>
        <PostContainer>
          {myPost.map((post) => (
            <SmallPostCard
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
          ))}
        </PostContainer>
      </ScrollView>
    </>
  );
};
