import styled from "styled-components";

const Box = styled.div`
  width: 50px;
  height: 50px;
  background-color: blue;
  border: 1px solid black;
`;

const Circle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
  border: 1px solid black;
`;

const Tri = styled.div`
  width: 0;
  height: 0;
  border-bottom: 50px solid skyblue;
  border-top: 50px solid transparent;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  translate: 0 -25%;
`;

export const components = {
  1: <Box />,
  2: <Circle />,
  3: <Tri />,
};
