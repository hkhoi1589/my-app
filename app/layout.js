import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
// import Client from './client'; // all plugins run only client

import 'react-toastify/dist/ReactToastify.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Beyond',
	description: 'The home page',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' className={`${inter.className} scroll-smooth`}>
			<body>
				<ToastContainer draggable={false} />
				{children}
			</body>
			{/* <Client /> */}
		</html>
	);
}
