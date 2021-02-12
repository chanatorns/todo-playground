import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 1rem 1rem;
  border: 2px solid #c7c7c7;
  border-radius: 33px;
  background-color: ${props => props.color || 'white'};
  display: flex;
  max-width: 500px;
  margin: auto;
  margin-bottom: 2px;

  input {
    margin-right: 2rem;
  }

  .content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;

    span {
      font-size: 0.7rem;
      color: grey;
    }
  }
`;

export const NewStepCard = styled.div`
  padding: 0.2rem 0;
  border-radius: 3px;
  background-color: ${props => props.color || 'white'};
  display: flex;
  max-width: 400px;
  margin: auto;
  margin-bottom: 1rem;

  .add-step {
    border: none;
    width: 100%;
    min-width: 10rem;
    margin-right: 1rem;
    background-color: #efefef;
    border-radius: 3px;
    padding: 0 1rem;
  }

  button {
    min-width: 5rem;
    margin-left: auto;
  }
`;