/** @type {import('next').NextConfig} */
const OPENAI_API_URL = process.env.OPENAI_API_ENDPOINT_URL;

const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: "/api/openai_api",
                destination: OPENAI_API_URL,
            },
        ];
    },
};

export default nextConfig;
