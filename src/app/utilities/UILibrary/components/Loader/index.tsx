import React, { FC } from 'react';
import { GeneralLoader } from './loader.styles';

type LoaderProps = {
  message?: string;
};

const Loader: FC<LoaderProps> = ({ message }) => {
  return (
    <GeneralLoader>
      <span />
      <div className="message-container">
        <h2>{message}</h2>
      </div>
    </GeneralLoader>
  );
};

export default Loader;
