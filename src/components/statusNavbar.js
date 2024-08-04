import React from "react";
import styled from "styled-components";

const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
    background-color: white;

    > div {
        width: 100%;
        display: flex;
        align-items: center;
    }

    > div:first-child {
        justify-content: flex-start;
    }

    > div:not(:first-child):not(:last-child) {
        justify-content: center;
    }

    > div:last-child {
        justify-content: flex-end;
    }
`;

const Navbar = ({ children }) => {
    return <StyledNav>{children}</StyledNav>;
};

export default Navbar;
