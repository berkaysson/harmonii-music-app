import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  .input-error {
    border: 3px solid #d65a5a;
  }

  span {
    font-size: 14px;
    margin: 6px;
  }

  .error-span{
    color: #dd7070;
  }

  button {
    padding: 10px 15px;
    color: white;
    border: 1px solid var(--turq-color-3);
    border-radius: .5rem;
    cursor: pointer;
    font-size: 16px;
    background-color: var(--turq-color-2);

    &:hover {
      background-color: var(--dark-blue-color);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;