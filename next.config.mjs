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

const CorsHeaders = [
	{ key: 'Access-Control-Allow-Credentials', value: 'true' },
	{ key: 'Access-Control-Allow-Origin', value: '*' },
	{
		key: 'Access-Control-Allow-Methods',
		value: '*',
	},
	{
		key: 'Access-Control-Allow-Headers',
		value: '*',
	},
	{
		key: 'Access-Control-Max-Age',
		value: '86400',
	},
];

if (mode !== 'export') {
	nextConfig.headers = async () => {
		return [
			{
				source: '/api/:path*',
				headers: CorsHeaders,
			},
		];
	};

	// nextConfig.rewrites = async () => {
	//   const ret = [
	//     // adjust for previous version directly using "/api/proxy/" as proxy base route
	//     {
	//       source: "/api/proxy/v1/:path*",
	//       destination: "https://api.openai.com/v1/:path*",
	//     },
	//     {
	//       source: "/api/proxy/google/:path*",
	//       destination: "https://generativelanguage.googleapis.com/:path*",
	//     },
	//     {
	//       source: "/api/proxy/openai/:path*",
	//       destination: "https://api.openai.com/:path*",
	//     },
	//     {
	//       source: "/google-fonts/:path*",
	//       destination: "https://fonts.googleapis.com/:path*",
	//     },
	//     {
	//       source: "/sharegpt",
	//       destination: "https://sharegpt.com/api/conversations",
	//     },
	//   ];

	//   return {
	//     beforeFiles: ret,
	//   };
	// };
}

export default nextConfig;