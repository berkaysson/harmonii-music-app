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
`;