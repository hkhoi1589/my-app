export default function Modal({ title, content, open, onConfirm }) {
	return (
		<div className={`modal sm:modal-middle backdrop:hidden ${open ? 'modal-open' : ''}`}>
			<div className='modal-box'>
				<h3 className='font-bold text-lg'>{title}</h3>
				<p className='py-4'>{content}</p>
				<div className='modal-action'>
					<label className='btn' onClick={() => onConfirm(false)}>
						Cancel
					</label>
					<label
						className='btn btn-error text-white px-8'
						onClick={() => onConfirm(true)}>
						OK
					</label>
				</div>
			</div>
		</div>
	);
}
