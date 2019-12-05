import styled from 'styled-components';

export default styled.div`
  font-family: ${props => props.theme.fonts.sansBold};
  font-size: ${props => props.theme.fontSizes[3]};
  font-weight: 600;
  letter-spacing: .5px;
  margin-bottom: ${props => props.theme.margin[1]};
  padding-left: ${props => props.theme.padding[1]};
  padding-top: ${props => props.theme.padding[0]};
  line-height: 1;
  padding-right: 45px;
`;
