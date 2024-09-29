import { colors } from '@/app/utilities/UILibrary/stylesTokens/colors';
import styled from 'styled-components';
import { uIFontSize } from '../stylesTokens/typography';
import { breakpoints } from '../stylesTokens/breakpoints';

export const NavbarContainer = styled.footer`
  background-color: ${colors.background.white};
  color: ${colors.text.default};
  font-size: ${uIFontSize.large};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  width: 100vw;

  @media (min-width: ${breakpoints.mobile}) {
    padding: 2.5rem 1.5rem;
  }
  @media (min-width: ${breakpoints.tablet}) {
    width: 100vw;
  }
  @media (min-width: ${breakpoints.desktop}) {
    padding: 1rem 2rem;
  }
`;

export const NavLinks = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;

  div {
    display: inherit;
    gap: 2rem;
    a {
      color: ${colors.text.default};
      text-decoration: none;
      font-size: ${uIFontSize.small};
      font-weight: 500;
    }

    a:hover {
      text-decoration: underline;
      text-decoration-color: ${colors.red};
    }

    span {
      font-weight: bold;
      font-size: ${uIFontSize.small};
    }
  }
`;
