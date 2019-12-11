import styled from 'styled-components';

export default styled.h3`
  font-size: ${props => props.theme.fontSizes[1]};
  font-family: ${props => props.theme.fonts.sansBold};
  padding: ${props => props.theme.padding[0]} 0 ${props => props.theme.padding[0]} 0;
  margin: 0 15px 0 0;
  line-height: ${props => props.theme.lineHeight};
`;