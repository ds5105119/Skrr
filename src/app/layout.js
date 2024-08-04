import "./globals.css";

export const metadata = {
    title: "아기 키우기 시뮬례이터~★",
    description: "미래 내 아이의 직업은?",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        images: [
            {
                url: "https://skrrr.vercel.app/opengraph-image.png",
                alt: "아기 키우기 시뮬례이터~★",
                width: 1859,
                height: 992,
            },
        ],
    },
    twitter: {
        images: [
            {
                url: "https://skrrr.vercel.app/twitter-image.png",
                alt: "아기 키우기 시뮬례이터~★",
                width: 1859,
                height: 992,
            },
        ],
    },
    locale: "ko_KR",
    type: "website",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko-KR">
            <body>{children}</body>
        </html>
    );
}
