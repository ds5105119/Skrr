"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoChevronBack } from "react-icons/io5";
import styles from "./page.module.css";

import fetchAIHandler from "@/api/openai";
import questions from "@/lib/resource/question";

import Navbar from "@/components/navbar";
import BottomNav from "@/components/bottomNav";
import Button from "@/components/button";
import IconButton from "@/components/icon-button";
import ButtonList from "@/components/button-list";
import MessageList from "@/components/message-list";
import Modal from "@/components/modal";
import ResultForm from "@/components/resultform";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const App = () => {
    const router = useRouter();
    const userName = decodeURI(window.location.pathname.split("/").pop());

    const messageEndRef = useRef(null);

    const [currentTypingId, setCurrentTypingId] = useState(null);
    const [currentQuestionIndex, setcurrentQuestionIndex] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isTestEnd, setIsTestEnd] = useState(false);
    const status = {
        외모: getRandomInt(0, 100),
        지능: getRandomInt(0, 100),
        예술성: getRandomInt(0, 100),
        "이성적 매력": getRandomInt(0, 100),
        성격: getRandomInt(0, 100),
        반사회성: getRandomInt(0, 100),
        "예상 성인 키": getRandomInt(140, 200),
    };

    const putUserMessage = (text) => {
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

    const sendMessageHandler = async (message) => {
        try {
            const request = await fetchAIHandler([
                {
                    role: "system",
                    content: JSON.stringify({
                        지시문: questions[0],
                        hint: questions[currentQuestionIndex]["hint"],
                        name: userName,
                        status: {
                            ...status,
                            ...questions[currentQuestionIndex]["status"],
                        },
                        history: messages.map(({ text }) => text),
                    }),
                },
                {
                    role: "user",
                    content: message,
                },
            ]);
            const jsonResponse = JSON.parse(request);

            if (!jsonResponse["answer"]) {
                throw new Error("fetchAIHandler error: no content");
            }

            return jsonResponse;
        } catch (error) {
            console.error("Failed to parse JSON response:", error);
            return false;
        }
    };

    const testEndHandler = async () => {
        try {
            const request = await fetchAIHandler([
                {
                    role: "system",
                    content: JSON.stringify({
                        지시문: questions["end"]["question"],
                        history: messages.map(({ text }) => text),
                    }),
                },
                {
                    role: "user",
                    content: JSON.stringify(questions["end"]["question"]),
                },
            ]);
            const jsonResponse = JSON.parse(request);

            if (!jsonResponse["MBTI"] || !jsonResponse["job"] || !jsonResponse["평가"]) {
                throw new Error("fetchAIHandler error: wrong ai answer");
            }

            setIsTestEnd(jsonResponse);
        } catch (error) {
            alert(error);
            testEndHandler();
        }
    };

    const handelSubmitButton = async (index) => {
        setIsLoading(true);
        putUserMessage(questions[currentQuestionIndex]["answer"][index]);

        const userContent = questions[currentQuestionIndex]["answer"][index];
        const response = await sendMessageHandler(userContent);

        if (response) {
            if (currentQuestionIndex < questions.info.ansCount) {
                setcurrentQuestionIndex((preIdx) => preIdx + 1);
            } else {
                testEndHandler();
                return true;
            }
            handleAIMessage(response["answer"]);
            setIsModalOpen(true);
        } else {
            handleAIMessage("다시 선택해줄 수 있을까?");
        }

        setIsLoading(false);
    };

    const handleSendMessage = async (message) => {
        setIsLoading(true);
        putUserMessage(message);

        const response = await sendMessageHandler(message);

        if (response) {
            if (currentQuestionIndex < questions.info.ansCount) {
                setcurrentQuestionIndex((preIdx) => preIdx + 1);
            } else {
                testEndHandler();
                return true;
            }
            handleAIMessage(response["answer"]);
        } else {
            handleAIMessage("다시 선택해줄 수 있을까?");
        }

        setIsLoading(false);
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

    // 문제 업데이트
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
                    <IconButton fill="true" color={"#FFFFFF"} onClick={() => router.push("/")}>
                        <IoChevronBack size={12} color={"black"}></IoChevronBack>
                    </IconButton>
                </div>
                <div>{userName}키우기</div>
                <div>
                    <Button fill="true" bordertype="round" color={"#FFFFFF"} onClick={() => setIsModalOpen(true)} disabled={isLoading}>
                        <p className={styles.blackColor}>선택지 열기</p>
                    </Button>
                </div>
            </Navbar>
            <div className={styles.chatbox}>
                <div className={styles.chatStartMessage}>대화가 시작되었습니다.</div>
                <MessageList messages={messages} currentTypingId={currentTypingId} onEndTyping={handleEndTyping} />
                <div ref={messageEndRef} />
            </div>
            <BottomNav placeholder="메세지 보내기..." onSendMessage={handleSendMessage} disabled={isLoading} />
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

            <div>{isTestEnd && <ResultForm name={userName} response={isTestEnd} />}</div>
        </main>
    );
};

export default App;
