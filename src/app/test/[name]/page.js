"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { IoChevronBack } from "react-icons/io5";
import styles from "./page.module.css";

import fetchQuestions from "@/api/fetch-questions";
import questions from "@/lib/resource/question";

import Navbar from "@/components/navbar";
import BottomNav from "@/components/bottomNav";
import Button from "@/components/button";
import IconButton from "@/components/icon-button";
import ButtonList from "@/components/button-list";
import MessageList from "@/components/message-list";
import Modal from "@/components/modal";

const App = () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    const messageEndRef = useRef(null);

    const [currentTypingId, setCurrentTypingId] = useState(null);
    const [currentQuestionIndex, setcurrentQuestionIndex] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState("");

    const putUserMessage = (text) => {
        setIsLoading(false);
        setIsModalOpen(false);

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                text: text,
                isUser: true,
            },
        ]);
    };

    const handleAIMessage = (text) => {
        setIsLoading(true);

        const aiMessage = {
            text: text,
            isUser: false,
            isNew: true,
            id: Date.now(),
        };

        setMessages((prevMessages) => [...prevMessages, aiMessage]);
    };

    const updateQuestionMessage = () => {
        if (currentQuestionIndex <= questions.info.ansCount) {
            handleAIMessage(questions[currentQuestionIndex]["question"]);
        }
    };

    const handelSubmitButton = async (index) => {
        putUserMessage(questions[currentQuestionIndex]["answer"][index]);

        const systemContent = questions[0] + questions[currentQuestionIndex]["question"];
        const userContent = questions[currentQuestionIndex]["answer"][index];
        const response = await fetchQuestions(systemContent, userContent);

        if (response) {
            setcurrentQuestionIndex((preIdx) => preIdx + 1);
            handleAIMessage(response["answer"]);
            setIsModalOpen(true);
        } else {
            handleAIMessage("다시 선택해줄 수 있을까?");
        }
    };

    const handleSendMessage = async (message) => {
        putUserMessage(message);

        const systemContent = questions[0] + questions[currentQuestionIndex]["question"];
        const response = await fetchQuestions(systemContent, message);

        if (response) {
            setcurrentQuestionIndex((preIdx) => preIdx + 1);
            handleAIMessage(response["answer"]);
            setIsModalOpen(true);
        } else {
            handleAIMessage("다시 선택해줄 수 있을까?");
        }
    };

    const handleEndTyping = (id) => {
        setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === id ? { ...msg, isNew: false } : msg)));
        setCurrentTypingId(null);
    };

    // 한 번 실행
    useEffect(() => {
        // init
        questions.info.script.map((text) => handleAIMessage(text));
    }, []);

    // 자동 스크롤
    useEffect(() => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages, currentQuestionIndex]);

    useEffect(() => {
        updateQuestionMessage();
    }, [currentQuestionIndex]);

    // id 바꾸기
    useEffect(() => {
        if (currentTypingId === null) {
            const nextTypingMessage = messages.find((msg) => !msg.isUser && msg.isNew);
            if (nextTypingMessage) {
                setCurrentTypingId(nextTypingMessage.id);
            }
        }
    }, [messages, currentTypingId]);

    return (
        <main className={styles.main}>
            <Image className={styles.backgroundImg} src={"/background.jpg"} alt="img" quality={70} fill={true} />
            <Navbar>
                <div>
                    <IconButton fill="true" color={"#FFFFFF"} onClick={() => router.back()}>
                        <IoChevronBack size={12} color={"black"}></IoChevronBack>
                    </IconButton>
                </div>
                <div>스껄키우기</div>
                <div>
                    <Button fill="true" bordertype="round" color={"#FFFFFF"} onClick={() => setIsModalOpen(true)}>
                        <p className={styles.blackColor}>선택지 열기</p>
                    </Button>
                </div>
            </Navbar>
            <div className={styles.chatbox}>
                <div className={styles.chatStartMessage}>대화가 시작되었습니다.</div>
                <MessageList messages={messages} currentTypingId={currentTypingId} onEndTyping={handleEndTyping} />
                <div ref={messageEndRef} />
            </div>
            <BottomNav placeholder="메세지 보내기..." onSendMessage={handleSendMessage} disabled={false} />
            <div>
                {isModalOpen && (
                    <Modal>
                        <p className={styles.modalTitle}>{questions[currentQuestionIndex]["question"]}</p>
                        <ButtonList items={questions[currentQuestionIndex]["answer"]} submit={handelSubmitButton} />
                        <Button className={styles.modelCloseButton} color={"black"} bordertype="rect" fill="true" onClick={() => setIsModalOpen(false)}>
                            집적 입력하기
                        </Button>
                    </Modal>
                )}
            </div>
        </main>
    );
};

export default App;
