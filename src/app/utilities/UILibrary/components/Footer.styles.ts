import { colors } from '@/app/utilities/UILibrary/stylesTokens/colors';
import styled from 'styled-components';
import { uIFontSize } from '../stylesTokens/typography';
import { breakpoints } from '../stylesTokens/breakpoints';

export const FooterContainer = styled.footer`
  background-color: ${colors.background.footer};
  color: ${colors.text.description};
  padding: 1rem;
  font-size: ${uIFontSize.small};
  max-width: 100vw;
  font-weight: 100;

  .footer-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    grid-auto-rows: auto;
    justify-items: center;
    text-align: center;
  }
  .footer-main-information {
    grid-column: 1 / -1;
    text-align: center;
    p {
      color: ${colors.text.link};
      font-weight: 600;
    }
  }

  .footer-links-section {
    display: flex;
    justify-content: space-between;
    width: 100%;

    div:first-child {
      text-align: left;
    }

    div:last-child {
      text-align: right;
    }
  }
  p,
  a {
    margin: 0;
    font-weight: 400;
  }

  a {
    color: ${colors.text.default};
    text-decoration: none;
    font-weight: 400;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (min-width: ${breakpoints.tablet}) {
    padding: 2.5rem 4.25rem 4.25rem;
  }
  @media (min-width: ${breakpoints.desktop}) {
    padding: 2.5rem 3.5rem;
  }
`;
