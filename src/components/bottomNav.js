import React from "react";
import Textarea from "./textInput";
import styled from "styled-components";

const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 10px 18px 10px;
`;

const BottomNav = ({ placeholder, onSendMessage, disabled }) => {
    return (
        <StyledNav>
            <Textarea placeholder={placeholder} onSendMessage={onSendMessage} disabled={disabled} />
        </StyledNav>
    );
};

export default BottomNav;
