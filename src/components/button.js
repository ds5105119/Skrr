import styled, { css } from "styled-components";

const borderType = {
    round: "4em",
    rect: "0.6em",
};

const StyledButton = styled.button`
    padding: 0.62em 1.5em 0.62em 1.5em;

    border: none;
    border-radius: ${({ bordertype }) => bordertype};

    transition: 150ms;
    user-select: none;
    cursor: pointer;

    ${({ fill, color }) =>
        fill == "true"
            ? css`
                  color: white;
                  box-shadow: 3px 4px 14px 0px rgba(0, 0, 0, 0.15);
                  background-color: ${color};
              `
            : css`
                  color: black;
                  box-shadow: 0 0 0 2px ${color} inset, 3px 4px 14px 0px #999999;
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

    &:disabled {
        background-color: grey;
        opacity: 0.6;
        pointer-events: none;
        cursor: not-allowed;
    }
`;

const Button = ({ color, fill, bordertype, children, onClick, disabled }) => {
    return (
        <StyledButton color={color} fill={fill} bordertype={borderType[bordertype]} onClick={onClick} disabled={disabled}>
            {children}
        </StyledButton>
    );
};

export default Button;
