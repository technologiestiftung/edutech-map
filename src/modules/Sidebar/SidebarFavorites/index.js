import React, { PureComponent, Fragment } from "react";
import { connect } from "unistore/react";
import Actions from "~/state/Actions";
import styled from "styled-components";

import { favoritesSelector } from "~/state/Selectors";

import CardCompact from "~/components/Card/CardCompact";
import DetailCard from "~/components/Card/Detail";
import Paragraph from "~/components/Paragraph";

import SidebarTitle from "../SidebarTitle";

const DetailTitle = styled(SidebarTitle)`
  margin-bottom: ${(props) => props.theme.padding[0]};
`;

const ListItems = styled.div``;

const StyledEmptyFavorites = styled.div`
  margin-left: ${(props) => props.theme.margin[0]};
`;

const EmptyFavorites = () => (
  <StyledEmptyFavorites>Noch keine Favoriten vorhanden.</StyledEmptyFavorites>
);

class SidebarList extends PureComponent {
  handleClick = (d) => {
    const { setDetailRoute, setSelectedData } = this.props;
    setDetailRoute(d.autoid);
    setSelectedData(true);
    setHighlightData(d)
  };

  render() {
    const { data, selectedData, detailData, setHighlightData } = this.props;

    return (
      <Fragment>
        {data && selectedData && detailData && <DetailCard data={detailData} />}
        {data && !selectedData && (
          <Fragment>
            <SidebarTitle>Favoriten</SidebarTitle>
            <Paragraph>
              Bitte beachten Sie, dass wir aus Datenschutzgründen keine Daten
              speichern. Gespeicherte Favoriten werden lediglich lokal im Cache
              ihres Browsers hinterlegt. Sobald Sie diesen leeren, werden Ihre
              Favoriten gelöscht.
            </Paragraph>
            <ListItems>
              {!data.length && <EmptyFavorites />}
              {data.map((d, i) => (
                <CardCompact
                  onClick={() => this.handleClick(d)}
                  key={`card-compact-key-${i}`}
                  data={d}
                />
              ))}
            </ListItems>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default connect(
  (state) => ({
    data: favoritesSelector(state),
    selectedData: state.selectedData,
    detailData: state.detailData,
  }),
  Actions
)(SidebarList);
