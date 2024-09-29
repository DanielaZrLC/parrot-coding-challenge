import styled, { css } from 'styled-components';
import { ButtonProps } from './types';
import { colors } from '../../stylesTokens/colors';
import { uIFontSize } from '../../stylesTokens/typography';

const sizes = ({
  size = 'medium',
  isSlim = false,
  isFullWidth,
}: ButtonProps) => {
  const sizes = {
    small: css`
      min-width: ${isFullWidth ? '100%' : '8rem'};
      height: ${isSlim ? '1.75rem' : '2.25rem'};
    `,
    medium: css`
      min-width: ${isFullWidth ? '100%' : '10rem'};
      height: ${isSlim ? '2.25rem' : '2.75rem'};
    `,
    large: css`
      min-width: ${isFullWidth ? '100%' : '12rem'};
      height: ${isSlim ? '2.75rem' : '3.25rem'};
    `,
  };

  return sizes[size];
};

const variants = {
  blue: css`
    background-color: ${colors.button.blue};
    color: ${colors.text.white};
  `,
  red: css`
    background-color: ${colors.button.red};
    color: ${colors.text.white};
  `,
  bluegray: css`
    background-color: ${colors.button.bluegray};
    color: ${colors.text.default};
  `,
  'border-red': css`
    background-color: ${colors.background.white};
    color: ${colors.text.black};
    border: 1px solid ${colors.button.red};
  `,
  'border-blue': css`
    background-color: ${colors.background.white};
    color: ${colors.text.default};
    border: 1px solid ${colors.button.blue};
  `,
};

const disabledOrLoading = ({ disabled, isLoading }: ButtonProps) => {
  if (disabled || isLoading) {
    return css`
      filter: grayscale(100%) opacity(0.5);
      pointer-events: none;
    `;
  }
  return css``;
};

export const ButtonContainer = styled.button<ButtonProps>`
  ${sizes}
  ${disabledOrLoading}

  font-size: ${({ fontSize }) => fontSize || uIFontSize.medium};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;
  border-radius: 8px;
  border: 0;
  padding: 0 1rem;
  cursor: pointer;

  ${({ variant = 'blue' }) => variants[variant]}
`;

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
