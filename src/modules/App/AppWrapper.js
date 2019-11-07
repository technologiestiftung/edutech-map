import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled, { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router-dom';

import Theme from '~/styles/DefaultTheme';

import Spinner from '~/components/Spinner';

const StyledAppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  font-family: ${props => props.theme.fonts.sans};
`;

class AppWrapper extends PureComponent {
  render() {
    return (
      <ThemeProvider theme={Theme}>
        <StyledAppWrapper>
          <Spinner loading={this.props.isLoading}/>

        {/*  />
          <Logo />
          <Menu />
          <Sidebar />
          <Map /> */}
        </StyledAppWrapper>
      </ThemeProvider>
    );
  }
}

export default withRouter(connect('isLoading')(AppWrapper));
