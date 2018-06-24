import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  padding: 0.25em 2em;
  flex-direction: column;
  margin: 1em;

  &:active {
    background: #41addd;
    color: #fff;
  }
`;
