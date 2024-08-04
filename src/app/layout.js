import "./globals.css";

export const metadata = {
    title: "아기 키우기 시뮬례이터~★",
    description: "미래 내 아이의 직업은?",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko-KR">
            <body>{children}</body>
        </html>
    );
}
