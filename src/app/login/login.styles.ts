import { colors } from '@/app/utilities/UILibrary/stylesTokens/colors';
import styled from 'styled-components';

import { breakpoints } from '@/app/utilities/UILibrary/stylesTokens/breakpoints';
import { uIFontSize } from '@/app/utilities/UILibrary/stylesTokens/typography';

export const MainSection = styled.footer`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 1rem 5rem;
  flex-wrap: wrap;
  @media (max-width: ${breakpoints.tablet}) {
    padding: 1rem;
    justify-content: center;
  }
`;

export const TextHeader = styled.footer`
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 56px;
    width: 40vw;
    color: ${colors.white.pearl};
  }
  @media (max-width: ${breakpoints.tablet}) {
    h1 {
      font-size: 50px;
      width: 80vw;
    }
  }
  @media (max-width: ${breakpoints.mobileLarge}) {
    h1 {
      font-size: 35px;
      width: 90vw;
    }
  }
`;

export const HomeContainer = styled.div`
  display: flex;
  height: 65vh;
  background-color: #ef4c4d;
  background-image: linear-gradient(180deg, #ef4c4d 40%, #f7f6fc 100%);
  align-items: center;
  justify-content: space-between;
`;

export const LoginContainer = styled.footer`
  background-color: ${colors.background.white};
  padding: 2rem 4rem;
  border-radius: 12px;
  h2 {
    color: ${colors.text.link};
    font-size: ${uIFontSize.xxLarge};
  }
  h3 {
    color: ${colors.text.link};
    font-size: ${uIFontSize.medium};
    margin-bottom: 1rem;
  }
  p {
    color: ${colors.text.light};
    font-size: ${uIFontSize.small};
    margin-bottom: 1rem;
  }
  @media (max-width: ${breakpoints.mobileLarge}) {
    padding: 1rem;
  }
`;

export const LoginFormWrapper = styled.div`
  width: 250px;

  @media (min-width: ${breakpoints.tablet}) {
    width: 300px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: 300px;
  }

  @media (min-width: ${breakpoints.largeDesktop}) {
    width: 400px;
  }
`;

export const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
