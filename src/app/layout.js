import "./globals.css";

export const metadata = {
    metadataBase: new URL("https://skrrr.vercel.app"),

    title: "아기 키우기 시뮬례이터~★",
    description: "미래 내 아이의 직업은?",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        images: [
            {
                url: "/landingimage.png",
                alt: "이미지 설명",
            },
        ],
    },
    twitter: {
        images: [
            {
                url: "/landingimage.png",
                alt: "이미지 설명",
            },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko-KR">
            <body>{children}</body>
        </html>
    );
}
