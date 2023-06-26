import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import idx from 'idx';
import Actions from '~/state/Actions';

import CardParagraph from './CardParagraph';
import CardTags from './CardTags';
import CardLinks from './CardLinks';
import CardLogo from './CardLogo';
import CategoryLabel from '../CategoryLabel';

const CardBodyWrapper = styled.div`
  font-size: ${props => props.theme.fontSizes[0]};
`;

class CardBody extends PureComponent {
  render() {
    const { data } = this.props;
    const logoUrl = idx(data, _ => _.logo[0].url);
    const websiteString = idx(data, _ => _.contact[0].website);
    const websitesArray = websiteString ? websiteString.split(',') : []
    const email = idx(data, _ => _.contact[0].email);
    const phone = idx(data, _ => _.contact[0].phone);
    const openingHours = idx(data, _ => _.contact[0].openinghours);
    const category = idx(data, _ => _.category);

    return (
      <CardBodyWrapper className={this.props.className}>
        { category && <CategoryLabel label='Leistungsangebot:' category={category}></CategoryLabel> }
        { logoUrl && <CardLogo label='Logo:' data={logoUrl}></CardLogo> }
        <CardParagraph type="bold" label='Adresse:' data={data.location[0].address}></CardParagraph>
        { websitesArray.length > 0 && <CardLinks label='Webseite:' links={websitesArray}></CardLinks> }
        { email && <CardLinks type="mailto:" label='E-Mail:' links={[email]}></CardLinks> }
        { phone && <CardParagraph type="bold" label='Telefon:' data={phone}></CardParagraph> }
        { openingHours && <CardParagraph type="bold" label='Öffnungszeiten:' data={openingHours}></CardParagraph> }
        <CardParagraph label='Beschreibung:' data={data.description}></CardParagraph>
        <CardTags label="Zielgruppen:"></CardTags>
      </CardBodyWrapper>
    );
  }
}

export default connect(state => ({
  detailData: state.detailData,
  favs: state.favs
}), Actions)(CardBody);
