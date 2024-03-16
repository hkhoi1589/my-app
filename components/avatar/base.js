'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// https://stackoverflow.com/questions/71791251/in-nextjs-warning-expected-server-html-to-contain-a-matching-div-in-div
export default function Avatar({ className, url, name }) {
	const [state, setState] = useState('');

	useEffect(() => {
		setState(url);
	}, [url]);

	return (
		<div className='avatar placeholder'>
			<div className={`bg-base-300/60 rounded-full ${className}`}>
				{state ? (
					<Image src={state} alt='avatar.jpg' width={40} height={40} />
				) : (
					<span className='text-2xl uppercase'>{name}</span>
				)}
			</div>
		</div>
	);
}
