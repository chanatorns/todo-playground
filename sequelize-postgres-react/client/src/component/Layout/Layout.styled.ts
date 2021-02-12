import styled from 'styled-components';

interface ContainerProps {
  bgColor?: string,
  fluid?: boolean
}

export const Container = styled.div<ContainerProps>`
  margin: auto;
  max-width: ${props => props.bgColor ? 'none' : '1000px'};
  background-color: ${props => props.bgColor};
  text-align: center;
  
  .add-todo {
    height: 1.6rem;
    margin-right: 1rem;
    min-width: 20rem;
    padding: 0 1rem;
  }

  button {
    height: 2rem;
  }
`;
