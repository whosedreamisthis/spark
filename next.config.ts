import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		qualities: [60, 75],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
			},
			{
				protocol: 'https',
				hostname: 'images.clerk.dev',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
	},
};

export default nextConfig;
