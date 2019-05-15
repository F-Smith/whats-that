import styled, { css } from "styled-components/macro";

const GameHeader = styled.div`
  align-items: center;
  color: white;
  display: flex;
  justify-content: center;
  padding: 20px 0 10px 0;
  width: 100%;

  ${props =>
    props.canYouDraw &&
    css`
      flex-direction: column;

      p {
        margin: 0;
        padding: 0;
      }
      h2 {
        font-size: 2rem;
        letter-spacing: 2px;
        margin: 10px;
        padding: 0;
        text-transform: uppercase;
      }
    `}
`;

export default GameHeader;
