import { useRef } from 'react';

function Filter({ classname = '', activeSort, setActiveSort, filterItems }) {
	const dropdownRef = useRef(null);
	const publicRef = useRef(null);

	return (
		<div className={`dropdown dropdown-end ${classname}`} ref={dropdownRef}>
			<label tabIndex={0} className='btn btn-xs btn-ghost gap-1 normal-case font-normal'>
				Sort: {activeSort?.label} <i className='ri-arrow-drop-down-line'></i>
			</label>
			<ul
				tabIndex={0}
				ref={publicRef}
				className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
				{filterItems.map((item, idx) => (
					<li key={`sort-${idx}`}>
						<button
							className='whitespace-nowrap'
							onClick={() => {
								setActiveSort(item);
								publicRef.current.blur();
							}}>
							{item.label}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Filter;
