import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  & .input-error{
    border: 1px solid red;
  }
  span{
    font-size: 12px;
  }
`;