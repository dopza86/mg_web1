import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import utils from "../../utils";

const Container = styled.View`
  padding-left: 20px;
`;

export default () => (
  <Container>
    <Ionicons name="md-arrow-back" size={28} />
  </Container>
);
