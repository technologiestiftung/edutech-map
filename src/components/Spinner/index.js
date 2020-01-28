import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Transition from "react-transition-group/Transition";
import { opacityFromState } from '../../utils/'

import CircularProgress from '@material-ui/core/CircularProgress';

const StyledCircularProgress = withStyles({
  root: {
    color: 'black',
  },
  svg: {
    fill: 'black'
  }
})(CircularProgress);

const SpinnerBG = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  position:absolute;
  z-index: 1000;
  opacity: ${p => opacityFromState(p.state)};
  transition: all .5s ease-in-out;
  display: ${p => (p.state == 'exited') ? 'none' : 'block'};
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  z-index: 10000;
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  user-select: none;
  pointer-events: none;

  span {
    padding-top: 20px;
    font-size: 13px;
    letter-spacing: .25px;
  }
`;

class Spinner extends PureComponent {
  render() {
    const { loading } = this.props;
    return (
      <Transition
        in={loading}
        timeout={{
          appear: 0,
          enter: 0,
          exit: 500,
        }}
        appear={true}
        mountOnEnter={true}
        unmountOnExit={false}
      >
        { state => {
          return (
          <SpinnerBG state={state}>
            <SpinnerWrapper>
              <StyledCircularProgress />
              <span>Lade EduTech Institutionen ...</span>
            </SpinnerWrapper>
          </SpinnerBG>
        )}}
      </Transition>
    );
  }
}

export default Spinner;
