"use client";

import styled from "styled-components";
import palette from "@/lib/styles/colorPalette";

const Button = styled.button`
    padding: 1rem 1.5rem 1rem 1.5rem;
    font-size: 1rem;
    background: #007aff;
    border-radius: 2rem;
    border-width: 0px;
    transition: 0.5s;

    &:hover {
        background: cornflowerblue;
        color: white;
        transition: 0.05s;
    }

    &:active {
        background: blue;
    }
`;

export default Button;
