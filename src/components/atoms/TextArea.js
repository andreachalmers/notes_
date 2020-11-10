import styled from "styled-components";

const TextArea = styled.textarea`
	min-width: 100%;
  max-width: 100%;
  border-width: 0 0 3px;
  padding-bottom: 16px;
  min-height: 128px;

  &:focus {
    outline: 0;
  }
  
  &.hidden {
  	//visibility: hidden;
  }
`;

export default TextArea