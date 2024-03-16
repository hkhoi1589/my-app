'use client';
import { useEffect, useState } from 'react';
import useDebounce from '@/utils/useDebounce';

import dynamic from 'next/dynamic';

const PostList = dynamic(() => import('@/components/search/post/list'));
const ChannelList = dynamic(() => import('@/components/search/channel/list'));
const UserList = dynamic(() => import('@/components/search/user/list'));

export default function Search({ className = '' }) {
	// dropdown
	const [pick, setPick] = useState('Post');
	const [toggle, setToggle] = useState(false);

	// search
	const [loader, setLoader] = useState(false); // refresh components (boolean)
	const [keyword, setKeyword] = useState(''); // input
	const valDebounce = useDebounce(keyword, 500); // debounce input

	// set show component list
	useEffect(() => {
		if (valDebounce) {
			setLoader(true);
		} else {
			setLoader(false);
		}
	}, [valDebounce]);

	// dropdown filter search
	const onPicked = (val) => {
		setToggle(false);
		setPick(val);
	};

	return (
		<div className={`container mx-auto p-4 ${className}`}>
			<div className='relative w-full'>
				<button className='btn btn-sm btn-ghost btn-circle z-10 absolute top-2 left-2'>
					<i className='ri-search-line text-xl opacity-80'></i>
				</button>
				<div className='dropdown w-full'>
					<input
						className='w-full input border-neutral rounded-full pl-10 pr-24'
						placeholder='Search'
						onChange={(e) => setKeyword(e.target.value)}
						tabIndex={1}
					/>
					<div
						tabIndex={1}
						className='dropdown-content z-40 shadow max-h-128 overflow-auto bg-base-100 rounded-box w-full'>
						{valDebounce && pick === 'User' ? (
							<UserList loader={loader} limit={40} q={valDebounce} />
						) : pick === 'Channel' ? (
							<ChannelList loader={loader} limit={40} q={valDebounce} />
						) : (
							<PostList loader={loader} limit={40} q={valDebounce} />
						)}
					</div>
				</div>
				<div
					className={`dropdown dropdown-end absolute right-2 top-2 ${
						toggle ? 'dropdown-open' : ''
					}`}>
					<label className='btn btn-sm rounded-full' onClick={() => setToggle(!toggle)}>
						{pick}
					</label>
					<ul className='menu dropdown-content border border-neutral shadow-sm bg-base-100 rounded-box z-40 p-2 w-32'>
						<li>
							<a onClick={() => onPicked('Post')}>Post</a>
						</li>
						<li>
							<a onClick={() => onPicked('Channel')}>Channel</a>
						</li>
						<li>
							<a onClick={() => onPicked('User')}>User</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
