"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { IoShareSocialSharp, IoLink } from "react-icons/io5";

import styles from "./page.module.css";
import Button from "@/components/button";
import IconButton from "@/components/icon-button";
import StyledInput from "@/components/input";
import Navbar from "@/components/navbar";
import { palette } from "@/lib/styles/colorPalette";

export default function Home() {
    const router = useRouter();
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        if (event.target.value.length < 14) {
            setMessage(event.target.value);
        }
    };

    const handleSubmitButton = () => {
        if (message) {
            router.push(`/test?name=${message}`);
        } else {
            alert("이름을 입력해 주세요!");
        }
    };

    const handleDeveloperButton = () => {
        router.push("https://github.com/ds5105119");
    };

    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert("클립보드에 링크가 복사되었어요.");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className={styles.main}>
            <Navbar>
                <div></div>
                <div>
                    {" "}
                    <span className={styles.headertext}>나의 2세는??</span>{" "}
                </div>
                <div></div>
            </Navbar>
            <div className={styles.title}>
                <Image className={styles.titleimage} src="/landingimage.png" priority fill />
            </div>

            <div className={styles.content}>
                <div className={styles.nameinput}>
                    <StyledInput placeholder="이름 입력하기" value={message} onChange={(event) => handleChange(event)}></StyledInput>
                </div>

                <div className={styles.button}>
                    <Button fill="true" color="#0D0D0D" bordertype="rect" onClick={handleSubmitButton}>
                        <div className={styles.h3}>시작하기</div>
                    </Button>
                </div>

                <hr className={styles.hr} />

                <div className={styles.button}>
                    <Button fill="true" color="#0D0D0D" bordertype="rect" onClick={handleDeveloperButton}>
                        <div className={styles.h3}>제작자</div>
                    </Button>
                </div>

                <div className={styles.h3}>공유하기</div>

                <IconButton color="#0D0D0D" fill="true" onClick={() => handleCopyClipBoard(router.asPath)}>
                    <IoLink size={26} color={"white"} />
                </IconButton>
            </div>
        </main>
    );
}
