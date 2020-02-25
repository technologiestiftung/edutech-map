import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  ${styledNormalize}

  @font-face {
      font-family: 'Clan Bold';
      src: url('../../public/fonts/clanot-bold-webfont.woff') format('woff');
      font-weight: 800;
      font-style: normal;
  }

  @font-face {
      font-family: 'Clan Medium';
      src: url('../../public/fonts/clanot-medium-webfont.woff') format('woff');
      font-weight: 600;
      font-style: normal;
  }

  @font-face {
      font-family: 'Clan Book';
      src: url('../../public/fonts/clanot-book-webfont.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }


  mapboxgl-ctrl-logo {
    display: none;
  }

  .mapbox-improve-map {
      display: none;
  }

  * {
    box-sizing: border-box;
  }

  .bold {
    font-family: 'Clan Bold';
    font-weight: 800;
  }

  body {
    padding: 0;
    margin: 0;
    position: relative;
    font-family: 'Clan Medium';
  }

  .category-label {
    display: block;
    margin-top: 10px;
    font-size: 12px;
    margin: 10px 0px 0;
    padding: 7px 10px 6px 24px;
    border-radius: 12px;
    color: white;
    position: relative;
    line-height: 1;
    background: black;
    width: fit-content;

    &:before {
      content: '';
      position: absolute;
      height: 8px;
      width: 8px;
      background: #000;
      border-radius: 100%;
      border: 2px solid white;
      left: 7px;
      top: 6px;
    }

    &.yellow {
      background: #DCC82D;

      &:before {
        background: #DCC82D;
      }
    }

    &.green {
      background: #41B496;;

      &:before {
        background: #41B496;;
      }
    }

    &.blue {
      background: #1E3791;

      &:before {
        background: #1E3791;
      }
    }

    &.red {
      background: #E60032;

      &:before {
        background: #E60032;
      }
    }
  }
`;
