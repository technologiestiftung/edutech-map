import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import idx from 'idx';

import CardParagraph from './CardParagraph';
import CardTags from './CardTags';
import CardLink from './CardLink';
import CardLogo from './CardLogo';

// import { SimpleOpeningHours } from 'simple-opening-hours';

// import OpeningHours from '~/components/OpeningHours';
// import WebsiteLink from '~/components/Link';
// import Accessibility from '~/components/Accessibility';
// import Transportation from '~/components/Transportation';
// import SocialMedia from '~/components/SocialMedia';

const CardParagraphAddress = styled(CardParagraph)``;
const CardParagraphWebsite = styled(CardParagraph)``;

const CardBodyWrapper = styled.div`
  font-size: ${props => props.theme.fontSizes[0]};
`;

const CardBodySection = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const CardSectionLeft = styled.div`
  margin-right: 10px;
  min-width: 35%;
  width: 35%;
`;

const CardSectionRight = styled.div`
  margin-left: auto;
  text-align: right;
  flex-grow: 1;
`;

const Description = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const WebsiteLinkContainer = styled(CardSectionRight)`
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;

  a {
    font-weight: 400;
  }
`;

function formatWebsite(str) {
  if (!str) {
    return '';
  }

  return str
    .toLowerCase()
    .replace(/https?:\/\//, '')
    .replace(/www\./, '')
    .replace(/\/$/, '');
}


class CardBody extends PureComponent {
  render() {
    const { data, targetGroups } = this.props;
    const logoUrl = idx(data, _ => _.logo[0].url);
    const website = idx(data, _ => _.contact[0].website);
    const address = idx(data, _ => _.contact[0].address);
    const email = idx(data, _ => _.contact[0].email);
    const phone = idx(data, _ => _.contact[0].address);
    const openingHours = idx(data, _ => _.contact[0].openingHours);
    // const openingHours = detailData.openingHours && new SimpleOpeningHours(detailData.openingHours);
    // const hasSocial = (
    //   detailData.twitter
    //   || detailData.facebook
    //   || detailData.instagram
    //   || detailData.youtube
    // );

    return (
      <CardBodyWrapper className={this.props.className}>
        { logoUrl && <CardLogo label='Logo:' data={logoUrl}></CardLogo> }
        <CardParagraph type="bold" label='Adresse:' data={data.location[0].address}></CardParagraph>
        { website && <CardLink label='Webseite:' data={website}></CardLink> }
        { email && <CardLink type="mailto:" label='E-Mail:' data={email}></CardLink> }
        { phone && <CardParagraph label='Telefon:' data={phone}></CardParagraph> }
        { phone && <CardParagraph label='Telefon:' data={phone}></CardParagraph> }
        { openingHours && <CardParagraph label='Öffnungszeiten:' data={openingHours}></CardParagraph> }
        <CardParagraph label='Beschreibung:' data={data.description}></CardParagraph>
        <CardTags label="Zielgruppen:"></CardTags>
      </CardBodyWrapper>
    );
  }
}

export default connect(state => ({
  detailData: state.detailData
}))(CardBody);
