import React from "react";
import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledText = styled.p`
    padding: 0.8rem 1rem 0.8rem 1rem;
    background-color: rgba(0, 0, 0, 0.1);
    font-size: 1.2rem;

    animation: ${slideUp} 50ms ease-out forwards;
`;

const Message = ({ text, key }) => {
    return <StyledText> {text} </StyledText>;
};

export default Message;
