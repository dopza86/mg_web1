import React, { useState } from "react";
import { Image, Platform, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import PostPhoto from "./PostPhoto";

import { useNavigation } from "@react-navigation/native";
import colors from "../../../colors";
import { toggleFollow, goConversation } from "../../../redux/usersSlice";
import { toggleLike } from "../../../redux/postsSlice";

const Container = styled.View`
  width: 100%;
`;
const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const FollwContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center
  margin-left: 10px;
  border: 1px solid black;
  padding: 2px 5px;
  border-radius: 5;
  background-color: #0095f6;
`;
const FollweText = styled.Text`
  color: white;
  font-size: 12px;
`;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;
const Bold = styled.Text`
  font-weight: 500;
`;
const Location = styled.Text`
  font-size: 12px;
`;
const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;
const IconContainer = styled.View`
  margin-right: 10px;
`;
const InfoContainer = styled.View`
  padding: 10px;
`;
const Caption = styled.Text`
  margin: 5px 0px;
`;

const PostCard = ({
  id,
  user,
  photos,
  caption,
  location,
  is_liked,
  like_count,
  token,
  me,
  postObj,
  like_list,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const iLike = like_list.filter(function (iliked) {
    return iliked.username == me.username;
  });

  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable>
          <HeaderUserContainer>
            <Bold>{user.username}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <PostPhoto photos={photos} />
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={() => dispatch(toggleLike(id))}>
            <IconContainer>
              <Ionicons
                size={24}
                color={iLike.length === 0 ? colors.black : colors.red}
                name="md-heart"
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>

        <Bold>{like_count === 0 ? "" : `${like_count}명이 좋아합니다`}</Bold>

        <Caption>
          <Bold>{user.username}</Bold> {caption}
        </Caption>
      </InfoContainer>
    </Container>
  );
};

export default PostCard;
