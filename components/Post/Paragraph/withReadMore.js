'use client';
import React, { useState } from 'react';
import Linkify from 'linkify-react';
import Link from 'next/link';

function Paragraph({ content = '', classname = '', maxWord = 200 }) {
	const [readmore, setReadMore] = useState(true);
	const options = React.useMemo(() => {
		return {
			render: {
				url: ({ attributes, content }) => {
					return (
						<Link {...attributes} className='text-secondary' target='_blank'>
							{content}
						</Link>
					);
				},
			},
		};
	}, []);
	return content.length > 200 ? (
		<div className={`${classname} break-all mb-4`}>
			{readmore ? (
				`${content.substring(0, maxWord)}...`
			) : (
				<Linkify options={options}>{content}</Linkify>
			)}
			<button className='text-secondary block' onClick={() => setReadMore(!readmore)}>
				{readmore ? 'Read more' : 'Show less'}
			</button>
		</div>
	) : (
		<div className={`${classname} break-all mb-4`}>
			<Linkify options={options}>{content}</Linkify>
		</div>
	);
}

export default Paragraph;
