import { colors } from '@/app/utilities/UILibrary/stylesTokens/colors';
import styled from 'styled-components';

import { breakpoints } from '@/app/utilities/UILibrary/stylesTokens/breakpoints';
import { uIFontSize } from '@/app/utilities/UILibrary/stylesTokens/typography';

export const DashboardMain = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    'header header'
    'categories-section products-section';
  height: 80vh;
  /* height: auto; */
  @media (max-width: ${breakpoints.mobileLarge}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'categories-section'
      'products-section';
  }
`;
// Header Section
export const Header = styled.div`
  grid-area: header;
  background-color: #0b1c4e; /* dark blue */
  color: ${colors.text.white};
  padding: 20px;
  text-align: center;
`;

// Categories Section (Pink)
export const CategoriesSection = styled.div`
  grid-area: categories-section;
  background-color: #f3c1d0; /* pink */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  h4 {
    color: #d0323b;
    font-size: 1.5em;
  }
  @media (max-width: ${breakpoints.mobileLarge}) {
    ul {
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

export const ProductsSection = styled.div`
  grid-area: products-section;
  background-color: #e2f1c1; /* light green */
  padding: 20px;

  ul {
    display: flex;
    gap: 20px;
    list-style-type: none;
    padding: 0;
  }

  li {
    background: white;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  h4 {
    color: #d0323b;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
    font-size: ${uIFontSize.paragraph};
  }

  .toggle {
    margin-top: 10px;
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 10px;
  }
  @media (max-width: ${breakpoints.mobileLarge}) {
    ul {
      flex-direction: column;
    }

    li {
      width: 100%; /* Full width for mobile */
    }
  }
`;
