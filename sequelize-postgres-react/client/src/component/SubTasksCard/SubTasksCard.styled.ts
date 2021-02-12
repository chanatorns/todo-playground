import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 1rem 1rem;
  border: 2px solid #c7c7c7;
  border-radius: 33px;
  background-color: ${props => props.color || 'white'};
  display: flex;
  max-width: 400px;
  margin: auto;
  margin-bottom: 2px;

  input {
    margin-right: 2rem;
  }
`;