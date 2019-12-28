import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import Actions from '~/state/Actions';
import Clear from '@material-ui/icons/Clear';
import FavIcon from '@material-ui/icons/FavoriteBorder';
import UnFavIcon from '@material-ui/icons/Favorite';

import RoundButton from '~/components/RoundButton';

import CardActions from './CardActions';
import CardWrapper from './CardWrapper';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardDivider from './CardDivider';
import SidebarTitle from '../../modules/Sidebar/SidebarTitle/';
import CategoryLabels from '~/components/CategoryLabels';
import Button from '~/components/GhostButton';


const FavButton = styled(Button)`
  color: #222;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const DetailTitle = styled(SidebarTitle)`
  margin-bottom: ${props => props.theme.padding[1]};
  padding-right: ${props => props.theme.padding[0]};
  padding-left: 0;
`;

const StyledCategoryLabels = styled(CategoryLabels)`
  margin-bottom: ${props => props.theme.margin[2]};
`;

const CardImage = styled.div`
  display: block;
  width: 70px;
  height: 70px;
  background-image: ${props => `url(${props.src.replace(/\s/g, '%20')})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const DetailHeader = styled.div`
  display: flex;
  width: 250px;
  flex-direction: row;
`;

const DetailCardWrapper = styled(CardWrapper)`
  display: flex;
  flex-direction: column;
  padding-top: ${props => props.theme.padding[0]};
  padding-left: ${props => props.theme.padding[1]};
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledCardHeader = styled(CardHeader)`
  padding: ${props => props.theme.padding[1]};
`;

const StyledCardBody = styled(CardBody)`
  padding-top: ${props => props.theme.padding[1]};
`;

class DetailCard extends PureComponent {
  state = {
    maxHeight: 'auto'
  }

  componentDidMount() {
    const maxHeight = window.innerWidth <= 768
    ? window.innerHeight - 100
    : Math.max(250, window.innerHeight - 200);

    this.setState({ maxHeight });
  }

  onClose(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.props.onClose(evt);
  }

  render() {
    const { data, favs, toggleFav } = this.props;

    const isFav = favs.includes(data.autoid);

    if (!data) {
      return null;
    }

    return (
      <DetailCardWrapper>
        <DetailHeader>
          <DetailTitle>{data.name}</DetailTitle>
        </DetailHeader>
        <StyledCategoryLabels categories={data.categoriesSelected} category={data.category} /*hasBorder={teaserUrl}*/ />
        <CardActions data={data} />
        <StyledCardBody data={data} />
      </DetailCardWrapper>
    );
  }
}

export default connect(state => ({
  favs: state.favs
}), Actions)(DetailCard);
