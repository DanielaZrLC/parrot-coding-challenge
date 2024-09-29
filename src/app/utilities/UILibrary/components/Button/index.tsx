import React, { forwardRef } from 'react';
import { ButtonProps } from './types';
import { ButtonContainer, Loading } from './styles';
import { Spinner } from '../Spinner';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, isLoading, loadingText, color, ...rest } = props;

    return (
      <ButtonContainer ref={ref} isLoading={isLoading} color={color} {...rest}>
        {isLoading ? (
          <Loading>
            <Spinner height="60%" dotSize="3px" />{' '}
            {loadingText && <p>{loadingText}</p>}
          </Loading>
        ) : (
          children
        )}
      </ButtonContainer>
    );
  },
);

Button.displayName = 'Button';
