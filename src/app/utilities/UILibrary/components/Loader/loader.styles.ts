import styled from 'styled-components';
import { uIFontSize } from '../../stylesTokens/typography';
import { colors } from '../../stylesTokens/colors';
import { breakpoints } from '../../stylesTokens/breakpoints';

export const GeneralLoader = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 10000000000;
  background-color: rgba(0, 0, 0, 0.6);

  .message-container {
    display: flex;
    text-align: center;
    position: relative;
    bottom: -6rem;
    width: 90%;

    h2 {
      font-size: ${uIFontSize.large};
      color: ${colors.text};
    }
  }

  > p {
    width: 100%;
  }
  > span {
    position: relative;
  }
  > span::before,
  span::after {
    content: ' ';
    position: absolute;
    left: 37%;
    transform: translate(-50%, 100%);
    background: ${colors.gray};
    width: 30px;
    height: 30px;
    border-radius: 50%;
    animation: jump 0.5s ease-in infinite alternate;
  }
  > span::after {
    background: ${colors.red};
    color: ${colors.red};
    top: 100%;
    box-shadow:
      320px -20px,
      -320px -20px;
    animation: split 0.5s ease-out infinite alternate;
  }
  @keyframes split {
    0% {
      box-shadow:
        8px -20px,
        -8px -20px;
    }
    100% {
      box-shadow:
        120px -20px,
        -120px -20px;
    }
  }
  @keyframes jump {
    0% {
      transform: translate(-50%, -350%);
    }
    100% {
      transform: translate(-50%, 200%);
    }
  }

  @media (min-width: ${breakpoints.tablet}) {
    .message-container {
      width: 50%;
    }
  }
`;
