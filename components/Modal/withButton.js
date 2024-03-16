'use client';
import React, { useRef } from 'react';

function Modal({
	className = '',
	classNameForm = '',
	classNameFooter = '',
	isIcon = true,
	title,
	children,
	isSubmit,
	handleSubmit,
	isOpen,
	setIsOpen,
	titleSubmit = '',
}) {
	const modal = useRef(null);

	return (
		<>
			<button className={`${className} flex-nowrap`} onClick={() => setIsOpen(!isOpen)}>
				{isIcon && <i className='ri-add-line'></i>}
				{title}
			</button>
			<div ref={modal} className={`modal sm:modal-middle ${isOpen ? 'modal-open' : ''}`}>
				<div className={`modal-box max-h-none ${classNameForm}`}>
					<button
						className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
						onClick={() => setIsOpen(!isOpen)}>
						✕
					</button>
					{children}
					<div className={`modal-action ${classNameFooter}`}>
						<button
							className='btn btn-sm btn-neutral disabled:btn-disabled rounded-2xl text-sm font-semibold'
							disabled={isSubmit}
							onClick={() => setIsOpen(!isOpen)}>
							Cancel
						</button>
						<button
							className={`btn-sm btn-primary disabled:btn-disabled rounded-2xl text-sm font-semibold ${
								titleSubmit ? 'btn' : 'hidden'
							}`}
							disabled={isSubmit}
							onClick={() => {
								handleSubmit();
							}}>
							{isSubmit && (
								<span className='loading loading-spinner loading-xs mr-1'></span>
							)}
							{titleSubmit}
						</button>
					</div>
				</div>
				<div onClick={() => setIsOpen(!isOpen)} className='modal-backdrop'></div>
			</div>
		</>
	);
}

export default Modal;
