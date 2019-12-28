import styled from 'styled-components';

export default styled.button`
  min-width: 142px;
  width: auto;
  height: 30px;
  background-color: ${props => (props.isActive ? '#000' : '#fff')};
  color: ${props => (props.isActive ? '#fff' : '#000')};
  transition: background-color .3s;
  will-change: background-color;
  border-radius: 0%;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: none;
  outline: none;
  border: none;
  flex-shrink: 0;
  font-size: ${props => props.theme.fontSizes[0]};
  flex-grow: 0;
  box-sizing: border-box;

  &:hover {
    background-color: ${props => (props.isActive ? '#000' : '#f2f2f2')};
    color: ${props => (props.isActive ? '#fff' : '#000')};
  }
`;
