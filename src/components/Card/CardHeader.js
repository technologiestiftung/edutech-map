import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import FavIcon from '@material-ui/icons/FavoriteBorder';
import UnFavIcon from '@material-ui/icons/Favorite';

import CategoryLabels from '~/components/CategoryLabels';
import Button from '~/components/GhostButton';
import Actions from '~/state/Actions';

const StyledCategoryLabels = styled(CategoryLabels)`
  margin-bottom: ${props => props.theme.padding[0]};
`;

const CardAddress = styled.div`
  font-size: 12px;
  line-height: 150%;
  color: ${props => props.type}
`;

const CardTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 4px 0;
  line-height: 1.2;
  letter-spacing: ${props => props.theme.letterSpacing[1]};
  margin-bottom: ${props => props.theme.margin[0]};
  color: ${props => props.type}
`;

const CardHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;

  ${CardAddress} {
    color: ${props => props.type}
  }

  ${CardTitle} {
    color: ${props => (props.teaserUrl ? 'white' : props.theme.colors.black)};
    font-family: ${props => props.theme.fonts.sansBold };
    font-weight: 600;
  }
`;

const CardHeaderLeft = styled.div`
  overflow: hidden;
  width: 290px;
  margin-right: 10px;
`;

const CardHeaderRight = styled.div`
  margin-left: auto;
`;

const CardTeaserImage = styled.div`
  background: ${props => `url(${props.src}) no-repeat center center`};
  background-size: cover;
  height: 150px;
`;

const FavButton = styled(Button)`
  color: black;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
  }
`;

class CardHeader extends PureComponent {

  handleClick = (d) => {
    const { setDetailRoute, setSelectedData } = this.props;
    setDetailRoute(d.name);
    setSelectedData(true);
  }

  render() {
    const {
      data,
      type,
      toggleFav,
      favs,
      isListMode
    } = this.props;

    const isFav = favs.includes(data.name);


    return (
      <Fragment>
        <CardHeaderWrapper>
          <CardHeaderLeft onClick={() => this.handleClick(data)} >
            <CardTitle type={type}>{data.name}</CardTitle>
            <StyledCategoryLabels categories={data.categoriesSelected} type={type} category={data.category} /*hasBorder={teaserUrl}*/ />
            <CardAddress type={type}>{data.location[0].address}</CardAddress>
          </CardHeaderLeft>
          <CardHeaderRight>
            {isListMode && (
              <FavButton
                onClick={() => toggleFav(data.name)}
                active={isFav}
              >
                {isFav ? <UnFavIcon /> : <FavIcon />}
              </FavButton>
            )}
          </CardHeaderRight>
        </CardHeaderWrapper>
      </Fragment>
    );
  }
}

export default connect(state => ({
  favs: state.favs
}), Actions)(CardHeader);
