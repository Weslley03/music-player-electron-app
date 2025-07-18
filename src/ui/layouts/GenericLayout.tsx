import React from 'react';
import HeaderGlobal from '../components/HeaderGlobal/HeaderGlobal';
import MyLibrary from '../components/MyLibrary/MyLibrary';

type Props = {
  children: React.ReactNode;
};

const GenericLayout: React.FC<Props> = ({
  children,
}) => {
  return (
    <div>
      <HeaderGlobal />
      <MyLibrary />
      {children}
    </div>
  );
};

export default GenericLayout;
