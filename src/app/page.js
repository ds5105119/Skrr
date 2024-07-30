"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/button";
import { palette } from "@/lib/styles/colorPalette";
import { useRouter, usePathname, useSearchParams, useSelectedLayoutSegment, useSelectedLayoutSegments, redirect, notFound } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <p>나의 2세는??</p>
            </div>

            <div className={styles.center}>
                <Image className={styles.logo} src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
            </div>

            <div className={styles.grid}>
                <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
                    <h2>
                        Docs <span>-&gt;</span>
                    </h2>
                    <p>Find in-depth information about Next.js features and API.</p>
                </a>

                <a href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
                    <h2>
                        Learn <span>-&gt;</span>
                    </h2>
                    <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
                </a>

                <a href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
                    <h2>
                        Templates <span>-&gt;</span>
                    </h2>
                    <p>Explore starter templates for Next.js.</p>
                </a>

                <a href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
                    <h2>
                        Deploy <span>-&gt;</span>
                    </h2>
                    <p>Instantly deploy your Next.js site to a shareable URL with Vercel.</p>
                </a>
            </div>
            <div className={styles.grid}>
                <Button color={palette.blue2} border="round" fill="true" onClick={() => router.push("/test")}>
                    시작하기
                </Button>
                <Button color={palette.blue2} border="round" fill="flase" onClick={() => router.push("/test")}>
                    instagram
                </Button>
            </div>
        </main>
    );
}
