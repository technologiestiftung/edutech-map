import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import EditIcon from '@material-ui/icons/Edit';
import FavIcon from '@material-ui/icons/FavoriteBorder';
import UnFavIcon from '@material-ui/icons/Favorite';

import Button from '~/components/GhostButton';
import Link from '~/components/Link';

import EdgeButtonSmall from '../EdgeButtonSmall';

import Actions from '~/state/Actions';
import { mailTo } from '~/state/dataUtils';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledA = styled.a`
  text-decoration: none;
`;

const IconWrapper = styled.div`
  margin-right: 5px;

  svg {
    height: 18px;
    width: 18px;
  }
`;

const CardActionsWrapper = styled.div`
  display: flex;
  transform: translateX(-7px);
  justify-content: space-between;
  padding-bottom: ${props => props.theme.padding[1]};
`;

const StyledFavIcon = styled(FavIcon)`
  font-size: 15px !important;
  margin-right: 2px;
  margin-top: -2px;
`;

const StyledUnFavIcon = styled(UnFavIcon)`
  font-size: 15px !important;
  margin-right: 2px;
  margin-top: -2px;
`;

class CardActions extends PureComponent {
  render() {
    const { data, toggleFav, favs } = this.props;
    const isFav = favs.includes(data.autoid);
    const favButtonLabel = isFav ? 'aus den Favoriten entfernen' : 'zu den Favoriten';

    return (
      <CardActionsWrapper>
        <ButtonWrapper>
          <StyledA href={mailTo(data.name)}>
            <EdgeButtonSmall>
              <IconWrapper>
                <EditIcon/>
              </IconWrapper>
              Änderung melden
            </EdgeButtonSmall>
          </StyledA>

          <EdgeButtonSmall
            onClick={() => {toggleFav(data.autoid)}}
          >
            <IconWrapper>
              {isFav ? <UnFavIcon /> : <FavIcon />}
            </IconWrapper>
            {isFav ? "Aus Favoriten entfernen" : "Zu Favoriten"}
          </EdgeButtonSmall>

        </ButtonWrapper>
      </CardActionsWrapper>
    );
  }
}

export default connect(state => ({
  favs: state.favs
}), Actions)(CardActions);
