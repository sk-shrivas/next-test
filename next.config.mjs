/** @type {import('next').NextConfig} */
const nextConfig = {

    api: {
        bodyParser: false,
        responseLimit: false,
        externalResolver: true,
      },
};

export default nextConfig;
