import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Clear from '@material-ui/icons/Clear';

import RoundButton from '~/components/RoundButton';

// import CardActions from './CardActions';
import CardWrapper from './CardWrapper';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardDivider from './CardDivider';
// import CardNearby from './CardNearby';

import CategoryLabels from '~/components/CategoryLabels';

const StyledCategoryLabels = styled(CategoryLabels)`
  margin-bottom: ${props => props.theme.margin[2]};
`;

const DetailCardWrapper = styled(CardWrapper)`
  display: flex;
  flex-direction: column;
  padding-top: ${props => props.theme.padding[0]};
  padding-left: ${props => props.theme.padding[1]};
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
    const { data } = this.props;

    if (!data) {
      return null;
    }

    return (
      <DetailCardWrapper>
        <StyledCategoryLabels categories={data.categoriesSelected} category={data.category} /*hasBorder={teaserUrl}*/ />
        {/* <CardActions data={data} /> */}
        <StyledCardBody data={data} />
      </DetailCardWrapper>
    );
  }
}

export default DetailCard;
