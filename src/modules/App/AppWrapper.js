import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled, { ThemeProvider } from 'styled-components';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';
import { piwik } from '~/state/dataUtils';

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

const muiTheme = createMuiTheme({
  typography: {
    fontFamily: "Clan Medium"
  }
});

class AppWrapper extends PureComponent {
  componentDidMount() {
    var _paq = [];
    _paq.push(["setCookieDomain", "*.edutech.technologiestiftung-berlin.de"]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    piwik(_paq)
    window._paq = _paq;
  }

  render() {
    const { isLoading } = this.props;
    return (
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={Theme}>
          <StyledAppWrapper>
            <Nav />
            <Sidebar />
            <Map />
            <Spinner loading={isLoading}/>
          </StyledAppWrapper>
        </ThemeProvider>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(connect(state => ({
  isLoading: state.isLoading,
  data: state.data
}))(AppWrapper));
