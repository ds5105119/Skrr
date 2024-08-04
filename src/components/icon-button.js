import styled, { css } from "styled-components";

const StyledIconButton = styled.button`
    display: flex;
    align-items: center;

    font-size: 1rem;
    padding: 0.8em 0.8em 0.8em 0.8em;

    border: none;
    border-radius: 5em;

    transition: 150ms;
    user-select: none;
    cursor: pointer;

    ${({ fill, color }) =>
        fill == "true" || true
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

const IconButton = ({ color, fill, children, onClick, disabled }) => {
    return (
        <StyledIconButton color={color} fill={fill} onClick={onClick} disabled={disabled}>
            {children}
        </StyledIconButton>
    );
};

export default IconButton;
