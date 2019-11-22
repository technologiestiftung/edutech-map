import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled, { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router-dom';

import Theme from '~/styles/DefaultTheme';

import Map from '~/modules/Map';
import Spinner from '~/components/Spinner';
import Nav from '~/components/Nav';
import Sidebar from '~/modules/Sidebar';

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
           */}
          <Nav />
          <Sidebar />
          <Map />
        </StyledAppWrapper>
      </ThemeProvider>
    );
  }
}

export default withRouter(connect(state => ({
  isLoading: state.isLoading,
  data: state.data
}))(AppWrapper));
