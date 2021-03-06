import styled, { css } from "styled-components/macro";

const GameHeader = styled.div`
  align-items: center;
  background-color: #533497;
  color: white;
  display: flex;
  justify-content: space-around;
  padding: 15px;
  margin-top: 20px;
  min-height: 84px;
  border-radius: 50px;
  width: 95%;

  ${props =>
    props.timer &&
    css`
      justify-content: flex-start;
      padding: 1vh 4vw;
      min-height: 0;
    `}

  ${props =>
    props.inGame &&
    css`
      justify-content: center;
      align-items: center;
      min-height: 0;
      padding: 0;
    `}
`;

export default GameHeader;
