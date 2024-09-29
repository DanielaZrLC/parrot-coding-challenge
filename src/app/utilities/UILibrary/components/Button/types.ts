import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type Variants =
  | 'blue'
  | 'red'
  | 'bluegray'
  | 'border-red'
  | 'border-blue';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode;
  isFullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  isSlim?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  variant?: Variants;
  fontSize?: string;
};
