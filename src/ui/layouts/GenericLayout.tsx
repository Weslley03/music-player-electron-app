import React from 'react';
import HeaderGlobal from '../components/HeaderGlobal/HeaderGlobal';

type Props = {
  children: React.ReactNode;
};

const GenericLayout: React.FC<Props> = ({
  children,
}) => {
  return (
    <>
      <HeaderGlobal />
      {children}
    </>
  );
};

export default GenericLayout;
