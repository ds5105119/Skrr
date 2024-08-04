"use client";
import { useState, useRef, useEffect } from "react";

import styled from "styled-components";
import IconButton from "./icon-button";

import { LuSend } from "react-icons/lu";

const StyledForm = styled.form`
    width: 100%;
    height: auto;

    display: flex;
    justify-content: space-between;

    z-index: 0;
    padding-top: 0.5rem;
    padding-right: 1rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;

    box-shadow: 3px 4px 14px 0px rgba(0, 0, 0, 0.05);
    border-radius: 2rem;
    background-color: rgba(255, 255, 255, 0.9);
`;

const StyleTextarea = styled.textarea`
    flex: 1;
    align-self: center;
    height: auto;
    max-height: 5.4em;

    margin-top: 0;
    margin-right: 1rem;
    margin-bottom: 0;
    margin-left: 1rem;

    word-break: normal;
    resize: none;
    overflow: auto;
    font-size: 1.5rem;

    background-color: transparent;
    border: none;
    cursor: text;

    &:focus {
        outline: none;
    }
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    align-items: flex-end;
`;

const Textarea = ({ placeholder, onSendMessage, disabled }) => {
    /**
     * @param onSendMessage: message 처리할 함수 넣으쇼
     * @returns: 입력 폼
     * @todo: 엔터키 쳤을 때 이벤트 헨들링 할까
     */

    const textarea = useRef();
    const [message, setMessage] = useState("");

    // text 줄바꿈 시, textarea height 자동 확장
    const handleResizeHeight = () => {
        textarea.current.style.height = "1px";
        textarea.current.style.height = textarea.current.scrollHeight + "px";
    };

    // textarea의 onChange 핸들러
    const handleChange = (event) => {
        setMessage(event.target.value);
        handleResizeHeight();
    };

    // form의 onSubmit 핸들러
    const handleSubmit = (event) => {
        /* 새로고침 금지 */
        event.preventDefault();
        if (message) {
            onSendMessage(message);
            setMessage("");
            textarea.current.style.height = "auto";
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit} className="message-form">
            <StyleTextarea ref={textarea} rows={1} placeholder={placeholder} value={message} onChange={(event) => handleChange(event)} />
            <StyledButtonWrapper>
                <IconButton color="#007aff" fill="true" bordertype="round" onClick={handleSubmit} disabled={disabled}>
                    <LuSend size={"20px"} color={"white"} />
                </IconButton>
            </StyledButtonWrapper>
        </StyledForm>
    );
};

export default Textarea;
