import Link from 'next/link';
import React from 'react';

export default function Tabs({ className = '', items }) {
	return (
		<div className={`tabs text-sm overflow-x-auto flex-nowrap font-normal ${className}`}>
			{items.map((tab, idx) => (
				<Link
					key={`tab-${idx}`}
					href={tab.href}
					className={`mr-5 px-0 border-b-2 border-b-transparent tab hover:tab-bordered whitespace-nowrap ${
						tab.active && 'tab-active font-bold'
					}`}>
					{tab.label}
				</Link>
			))}
		</div>
	);
}
