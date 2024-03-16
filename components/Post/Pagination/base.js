'use client';
import { handleToTop } from '@/utils';
import React from 'react';

function Pagination({ page, total, limit, setPage }) {
	const handleClick = (number) => {
		handleToTop(0); // not working
		setPage(number - 1);
	};

	return (
		<div
			className={`join flex-wrap justify-center mb-8 max-w-full ${
				Math.ceil(total / limit) > 1 ? 'flex' : 'hidden'
			}`}>
			{Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1).map((number) => (
				<button
					key={`page-${number}`}
					onClick={() => handleClick(number)}
					className={`join-item !rounded-full bg-neutral hover:btn-accent w-10 h-10 p-2 m-2 ${
						number === page + 1 ? 'btn-active btn-accent' : ''
					}`}>
					{number}
				</button>
			))}
		</div>
	);
}

export default Pagination;
