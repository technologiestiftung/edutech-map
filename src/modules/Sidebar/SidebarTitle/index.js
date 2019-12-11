import styled from 'styled-components';

export default styled.div`
  font-family: ${props => props.theme.fonts.sansBold};
  font-size: ${props => props.theme.fontSizes[4]};
  font-weight: 600;
  margin-bottom: ${props => props.theme.margin[2]};
  padding-left: ${props => props.theme.padding[1]};
  padding-top: ${props => props.theme.padding[0]};
  line-height: 130%;
  padding-right: 45px;
`;
