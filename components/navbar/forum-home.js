'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
export default function Navbar({ className = '' }) {
	const [toggleMenu, setToggleMenu] = useState(false);

	const menu = [
		{
			name: 'SCHOOL PRINCIPAL',
			child: [{ name: 'announcements  1k' }, { name: 'school activities  15k' }],
		},
		{
			name: 'TEACHER',
			child: [{ name: 'item a 1k' }, { name: 'item b 15k' }],
		},
		{
			name: 'STUDENT',
			child: [{ name: 'item a 1k' }, { name: 'item b 15k' }],
		},
		{
			name: 'PARENT',
			child: [{ name: 'item a 1k' }, { name: 'item b 15k' }],
		},
		{
			name: 'STAFF',
			child: [{ name: 'item a 1k' }, { name: 'item b 15k' }],
		},
	];

	return (
		<div className={`backdrop-blur ${className}`}>
			<nav className='container mx-auto px-4 flex justify-between min-h-16'>
				<div className='-ml-4'>
					<a href='/' className='flex items-center overflow-hidden max-h-[69px]'>
						<Image src='/img/svg/h.svg' alt='h.svg' height='69px' />
						<Image
							src='/img/svg/hight-school.svg'
							alt='hight-school.svg'
							height='69px'
							className='mt-2 ml-2'
						/>
					</a>
				</div>
				<div className='flex items-center'>
					<ul className='menu menu-lg menu-horizontal px-1 hidden lg:flex uppercase'>
						<li>
							<a href='#'>About</a>
						</li>
						<li>
							<a href='#'>Program</a>
						</li>
						<li>
							<a href='#'>Student Life</a>
						</li>
						<li>
							<a href='#'>News</a>
						</li>
					</ul>
					<div className='dropdown dropdown-end lg:hidden'>
						<label tabIndex='0' className='btn btn-ghost btn-circle'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								className='inline-block w-6 h-6 stroke-current'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16M4 18h16'></path>
							</svg>
						</label>
						<ul
							tabIndex='0'
							className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36'>
							<li>
								<a href='#'>Rooms</a>
							</li>
							<li>
								<a href='#our-story'>Our Story</a>
							</li>
							<li>
								<a href='#team'>Team</a>
							</li>
							<li>
								<a href='#contact'>Contact</a>
							</li>
						</ul>
					</div>
				</div>
				<div className='inline-flex items-center space-x-3'>
					<a href='#' className='btn btn-circle'>
						<i className='ri-twitter-fill text-2xl'></i>
					</a>
					<a href='#' className='btn btn-circle'>
						<i className='ri-facebook-fill text-2xl'></i>
					</a>
					<a href='#' className='btn btn-circle'>
						<i className='ri-vimeo-fill text-2xl'></i>
					</a>
				</div>
			</nav>
			<nav className='bg-accent/90'>
				<div className='container mx-auto px-4 py-3 grid grid-cols-5'>
					{menu.map((item, index) => {
						return (
							<div key={index} className='cursor-pointer'>
								<div
									className='uppercase font-semibold'
									onClick={() => setToggleMenu(!toggleMenu)}>
									{item.name} <i className='ri-add-fill'></i>
								</div>
								{toggleMenu &&
									item.child.map((child, idx) => (
										<Link
											href='#'
											key={`items-${idx}`}
											className='flex text-sm'>
											<i className='ri-corner-down-right-fill mr-1'></i>
											{child.name}
										</Link>
									))}
							</div>
						);
					})}
				</div>
			</nav>
		</div>
	);
}
