import styled from 'styled-components';

export default styled.p`
  padding-left: ${props => props.theme.padding[1]};
  line-height: ${props => props.theme.lineHeight};
  font-size: ${props => props.theme.fontSizes[1]};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.margin[3]};
`;
