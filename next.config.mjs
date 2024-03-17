const mode = process.env.BUILD_MODE ?? 'standalone';
console.log('[Next] build mode', mode);

const disableChunk = !!process.env.DISABLE_CHUNK || mode === 'export';
console.log('[Next] build with chunk: ', !disableChunk);

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: mode,
	trailingSlash: true,
	distDir: 'dist',
	images: {
		unoptimized: mode === 'export',
	},
};

export default nextConfig;
