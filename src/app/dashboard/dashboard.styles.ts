import { colors } from '@/app/utilities/UILibrary/stylesTokens/colors';
import styled from 'styled-components';

// import { breakpoints } from '@/app/utilities/UILibrary/stylesTokens/breakpoints';
import { uIFontSize } from '@/app/utilities/UILibrary/stylesTokens/typography';

// Main container
export const DashboardMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

// Header styling (green area)
export const Header = styled.header`
  background-color: ${colors.text.description}; /* Light green */
  width: 100%;
  padding: 20px 0;
  text-align: center;
  h1 {
    font-size: 2rem;
    color: ${colors.text.white};
  }
`;

// Categories section styling (pink area)
export const CategoriesSection = styled.section`
  /* background-color: #f8d7f4; */
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  h3 {
    width: 100%;
    text-align: center;
    margin-bottom: 3rem;
  }

  ul {
    display: flex;
    gap: 10px;
    list-style: none;
    padding: 0;
  }

  li {
    padding: 3rem 1.5rem;
    background-color: ${colors.status.error};
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    border: 2px solid ${colors.white.pearl};
    transition: all 0.3s ease;
    color: ${colors.text.white};
    font-size: ${uIFontSize.paragraph};

    &.active {
      background-color: #f44336; /* Red for active category */
      color: #fff;
    }

    &:hover {
      border: 2px solid #f44336;
    }
  }
  .cards-section {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    justify-content: space-evenly;
  }
`;

// Products section styling (blue area)
export const ProductsSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  /* background-color: #d0e7f9; */
  width: 100%;
  padding: 20px;
  img {
    border-radius: 8px;
    margin-bottom: 10px;
  }
  h2 {
    color: ${colors.text.link};
  }

  h4 {
    font-size: ${uIFontSize.small};
    margin-bottom: 10px;
    color: ${colors.text.default};
  }

  p {
    font-size: ${uIFontSize.xSmall};
    color: #333;
  }

  .toggle {
    margin-top: 10px;
  }
`;
