import styled, { css } from "styled-components/macro";

const PlayerList = styled.div`
  align-items: baseline;
  justify-content: space-around;
  display: flex;
  width: 100%;

  @media (min-width: 375px) {
    max-width: 375px;
  }

  ${props =>
    props.results &&
    css`
    align-items: flex-end;
    `};

  ${props =>
    props.betweenRounds &&
    css`
      margin: 80px 0 20px 0;
    `};

  ${props =>
    props.mobile &&
    css`
      @media (max-width: 450px) {
        display: none;
      }
    `};
`;

export default PlayerList;
