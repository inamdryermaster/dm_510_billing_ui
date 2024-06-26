import styled from '@emotion/styled';
import React, { useEffect } from 'react';

import NavigatePages from './payment/components/NavigatePages';

const Home: React.FC = () => {
  useEffect(() => {}, []);
  return (
    <React.Fragment>
      <Wrapper>
        <NavigatePages />
        <h1>Home Page</h1>
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  /* min-height: 300vh; */
`;
export default Home;
