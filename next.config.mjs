/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "storage.example.com",
                port: "",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
