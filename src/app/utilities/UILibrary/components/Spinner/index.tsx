import React, { FC } from 'react';
import styled from 'styled-components';

const SpinnerContainer = styled.span<SpinnerProps>`
  height: ${(props) => props.height};
  aspect-ratio: 1;
  border: ${(props) => props.dotSize} dotted #fff;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

type SpinnerProps = {
  height?: string;
  dotSize?: string;
};

export const Spinner: FC<SpinnerProps> = ({
  height = '40px',
  dotSize = '5px',
}) => (
  <>
    <SpinnerContainer height={height} dotSize={dotSize} className="loader" />
  </>
);
