"use client";
/* user-select는 button의 Content를 선택할 수 없도록 한다. */

import styled, { css } from "styled-components";

const borderType = {
    round: css`
        --button-border-radius: 2rem;
    `,
    rect: css`
        --button-border-radius: 0.2rem;
    `,
};

const StyledButton = styled.button`
    ${(props) => borderType[props.border]}

    padding: 0.65rem 1.5rem 0.65rem 1.5rem;
    font-size: 1rem;

    border-radius: var(--button-border-radius);
    transition: 150ms;
    border: none;

    ${(props) =>
        props.fill == "true"
            ? css`
                  color: white;
                  background-color: ${props.color};
              `
            : css`
                  color: black;
                  box-shadow: 0 0 0 2px ${props.color} inset;
                  background-color: white;
              `}

    &:hover {
        filter: brightness(1.15);
        transition: 150ms;
    }

    &:active {
        filter: brightness(0.95);
        transition: 80ms;
    }

    user-select: none;
`;

const Button = ({ color, fill, border, children, onClick }) => {
    return (
        <StyledButton color={color} fill={fill} border={border} onClick={onClick}>
            {children}
        </StyledButton>
    );
};

export default Button;
