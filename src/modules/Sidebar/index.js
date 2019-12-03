import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Route, withRouter, Switch } from 'react-router-dom';

import SidebarClose from './SidebarClose';

import SidebarList from './SidebarList';
import SidebarInfo from './SidebarInfo';
import SidebarFilter from './SidebarFilter';

const SidebarWrapper = styled.div`
  display: block;
  background: #fefefe;
  display: flex;
  box-shadow: ${props => (props.isVisible ? props.theme.boxShadow : 'none')};
  z-index: 1000;
  flex-direction: column;
  position: absolute;
  transform: ${props => (props.isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(calc(-100% - 15px), 0, 0)')};
  transition: transform .5s, box-shadow .5s;
  overflow: auto;
  height: calc((100vh - 0px) - 24px);
  margin: 12px;
  max-width: 370px;
  -webkit-overflow-scrolling: touch;
`;

const SidebarContent = styled.div`
  min-width: 370px;
  max-width: 370px;
  padding: 20px 15px;
`;

class Sidebar extends PureComponent {
    render() {
      return (
            <Route
                path={['/liste', '/suche', '/favoriten', '/info']}
                children={({ match }) => (
                    <SidebarWrapper isVisible={match}>
                        <SidebarClose />
                        <SidebarContent>
                          <Switch>
                            <Route path="/suche" component={SidebarFilter} />
                            <Route path="/liste" component={SidebarList} />
                            {/* <Route path="/favoriten" component={SidebarFavorites} /> */}
                            <Route path="/info" component={SidebarInfo} />
                          </Switch>
                        </SidebarContent>
                    </SidebarWrapper>
                )}
            />
      )
    }
}

export default withRouter(Sidebar);