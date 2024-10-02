import { colors } from '@/app/utilities/UILibrary/stylesTokens/colors';
import styled from 'styled-components';
import { breakpoints } from '@/app/utilities/UILibrary/stylesTokens/breakpoints';
import { uIFontSize } from '@/app/utilities/UILibrary/stylesTokens/typography';

export const DashboardMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 20px;
  background-color: ${colors.gray.default};
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  text-align: center;
  h4 {
    font-size: ${uIFontSize.small};
    color: ${colors.text.link};
  }
`;

export const CategoriesSection = styled.section`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  h3 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: ${uIFontSize.xxLarge};
    width: 100%;
  }
  p {
    color: ${colors.gray.light};
    font-size: ${uIFontSize.small};
  }

  .cards-section {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 90%;
    p {
      color: ${colors.text.white};
      background-color: ${colors.text.link};
      padding: 1rem;
      border-radius: 15px;
      font-size: small;
      outline-offset: 2px;
      outline: 1px dashed ${colors.blue.secondary};
      &.active {
        background-color: ${colors.blue.secondary};
        color: ${colors.text.white};
      }
      &:hover {
        border: 2px solid #f44336;
      }
    }
  }
`;

export const ProductsSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
  .ant-switch.ant-switch-checked {
    background: ${colors.text.link};
  }
  .card-style {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
    margin: 2rem;
    justify-content: center;
    text-align: center;
    img {
      border-radius: 8px;
      margin-bottom: 10px;
    }
    h2,
    h4,
    p,
    h5 {
      text-align: center;
    }
    p {
      font-size: ${uIFontSize.xSmall};
      color: #333;
    }
    h2 {
      color: ${colors.text.link};
    }

    .toggle {
      margin-top: 10px;
    }

    @media (max-width: ${breakpoints.tablet}) {
      width: 90%;
      margin: 1rem 0;
    }
  }
`;
