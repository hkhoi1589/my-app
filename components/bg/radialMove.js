'use client';

export default function BG({ className = '' }) {
	try {
		const b = document.body;
		b.addEventListener('mousemove', function (event) {
			parallaxed(event, '#paral-1', 1.2);
			parallaxed(event, '#paral-2', -0.5);
			parallaxed(event, '#paral-3', -1.2);
		});
	} catch (err) {}

	function parallaxed(e, el = '#paral-1', move = 0.3) {
		const amountMovedX = (e.clientX * move) / 8;
		const amountMovedY = (e.clientY * move) / 8;
		const x = document.querySelector(el);
		if (x && x.style) x.style.transform = `translate(${amountMovedX}px, ${amountMovedY}px)`;
	}
	return (
		<div>
			<div className='fixed inset-0 blur-[86px] flex items-center justify-center'>
				<div
					id='paral-1'
					className='bg-orange-500 opacity-50 w-56 h-56 rounded-full'
					style={{
						transform: 'translate3d(0px, 60px, 0px)',
					}}></div>
				<div
					id='paral-2'
					className='bg-pink-500 opacity-50 w-96 h-96 rounded-full will-change-transform transform-gpu'
					style={{
						transform: 'translate3d(0px, 0px, 0px)',
					}}></div>
				<div
					id='paral-3'
					className='bg-teal-500 opacity-50 w-72 h-72 rounded-full'
					style={{
						transform: 'translate3d(0px, -60px, 0px)',
					}}></div>
			</div>
		</div>
	);
}
