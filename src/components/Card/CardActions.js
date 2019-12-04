import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import FavIcon from '@material-ui/icons/FavoriteBorder';
import UnFavIcon from '@material-ui/icons/Favorite';
// import EditIcon from '@material-ui/icons/Create';
// import ShareIcon from '@material-ui/icons/Reply';

import Button from '~/components/GhostButton';
import Link from '~/components/Link';

import Actions from '~/state/Actions';

const CardActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.padding[1]};
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
    const isFav = favs.includes(data.name);
    const favButtonLabel = isFav ? 'aus den Favoriten entfernen' : 'zu den Favoriten';

    return (
      <CardActionsWrapper>
        <Button
          onClick={() => toggleFav(data.name)}
          active={isFav}
        >
          {isFav ? <StyledUnFavIcon /> : <StyledFavIcon />}
          <span>{favButtonLabel}</span>
        </Button>
      </CardActionsWrapper>
    );
  }
}

export default connect(state => ({
  favs: state.favs
}), Actions)(CardActions);
