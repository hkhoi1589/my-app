import Image from 'next/image';
import Link from 'next/link';

export default function Navbar({ className = '' }) {
	return (
		<div className={`backdrop-blur ${className}`}>
			<nav className='container px-4 mx-auto flex justify-between min-h-16'>
				<div className='flex items-center'>
					<Link href='/'>
						<Image
							src='/img/svg/beyond-grey.svg'
							priority
							alt='beyond-grey.svg'
							width={134.5}
							height={32}
						/>
					</Link>
				</div>
				<div className='flex items-center'>
					<ul className='menu menu-lg menu-horizontal px-1 hidden lg:flex'>
						<li>
							<Link href='/auth/login'>Rooms</Link>
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
			</nav>
		</div>
	);
}
