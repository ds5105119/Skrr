import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./button";
import { palette } from "@/lib/styles/colorPalette";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    z-index: 0;
    width: 100%;
    & > * {
        height: 4rem;
        font-size: 1.3rem;
    }

    & > *:not(:last-child) {
        margin-bottom: 20px;
    }
`;

const ButtonList = ({ items, submit }) => {
    /**
     * @param items: [ text_1, text_2, ... ]
     * @param submit: handler(buttonIndex)
     */
    return (
        <StyledWrapper>
            {items.map((item, index) => (
                <Button color={palette.blue2} bordertype="rect" fill="true" key={index} onClick={() => submit(index)}>
                    {item}
                </Button>
            ))}
        </StyledWrapper>
    );
};

export default ButtonList;
