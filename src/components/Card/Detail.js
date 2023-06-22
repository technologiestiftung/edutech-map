import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import Actions from '~/state/Actions';

import CardActions from './CardActions';
import CardWrapper from './CardWrapper';
import CardBody from './CardBody';
import SidebarTitle from '../../modules/Sidebar/SidebarTitle/';
import CategoryLabels from '~/components/CategoryLabels';
import Icon from '~/components/Icon';

const DetailTitle = styled(SidebarTitle)`
  margin-bottom: ${props => props.theme.padding[1]};
  padding-right: ${props => props.theme.padding[0]};
  padding-left: 0;

  svg {
    margin-right: 10px;
  }
`;

const StyledCategoryLabels = styled(CategoryLabels)`
  margin-bottom: ${props => props.theme.margin[2]};
`;

const DetailHeader = styled.div`
  display: flex;
  width: 270px;
  flex-direction: row;
`;

const DetailCardWrapper = styled(CardWrapper)`
  display: block;
  flex-direction: column;
  padding-top: ${props => props.theme.padding[0]};
  padding-left: ${props => props.theme.padding[1]};
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
    const { data } = this.props;
    if (!data) {
      return null;
    }

    return (
      <DetailCardWrapper>
        <DetailHeader>
          <DetailTitle>
          <Icon isHomeschool={data.homeschool} color={data.color}/>
          {data.name}
          </DetailTitle>
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
