import React, { useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import styled from "styled-components/native";
import api from "../../../api";
import Btn from "../../../components/Auth/Btn";
import KakaoBtn from "../../../components/Auth/KakaoBtn";
import Input from "../../../components/Auth/Input";
import DismissKeyboard from "../../../components/DismissKeyboard";

import utils from "../../../utils";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
`;

export default ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  username,
  setUsername,
  password,
  setPassword,
  loading,
  handleSubmit,
}) => {
  return (
    <Container>
      <InputContainer>
        <Input value={lastName} placeholder="성" stateFn={setLastName} />
        <Input value={firstName} placeholder="이름" stateFn={setFirstName} />
        <Input value={username} placeholder="아이디" stateFn={setUsername} />
        <Input
          value={password}
          placeholder="비밀번호"
          stateFn={setPassword}
          isPassword={true}
        />
      </InputContainer>
      <Btn loading={loading} text={"가입하기"} accent onPress={handleSubmit} />
      {/* <KakaoBtn text={" 카카오로 시작"} accent={true} /> */}
    </Container>
  );
};
