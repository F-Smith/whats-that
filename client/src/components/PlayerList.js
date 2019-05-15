import styled, { css } from "styled-components/macro";

const PlayerList = styled.div`
  display: flex;
  list-style-type: none;

  ${props =>
    props.betweenRounds &&
    css`
      margin-top: -50px;
    `};
`;

export default PlayerList;
