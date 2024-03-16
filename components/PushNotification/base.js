'use client';
import { useNotiStore } from '@/store/forum';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createToken, receiveMessage } from '@/utils/firebase';
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { toast } from 'react-toastify';

export default function PushNotification() {
	const { noties, setNoti, setFCMToken, addNoti } = useNotiStore();

	const [count, setCount] = useState(0);
	const dropdownRef = useRef();

	const handleClickNoti = () => {
		const newNoties = noties?.map((e) => ({ ...e, isSeen: true }));
		setNoti(newNoties);
	};

	const handleClickNotiItem = () => {
		dropdownRef.current.removeAttribute('open'); // collapse dropdown when redirect
	};

	useEffect(() => {
		// Initialize Firebase
		const app = initializeApp({
			apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
			authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
			storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
			messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
			appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
			measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
		});

		// Initialize Firebase Cloud Messaging and get a reference to the service
		const messaging = getMessaging(app);

		if (!Reflect.has(window, 'Notification')) {
			// Check if the browser supports notifications
			toast.warn('This browser does not support notifications.');
		} else if (!('serviceWorker' in navigator)) {
			toast.warn('Service Worker API is not supported.');
		} else if (!('PushManager' in window)) {
			toast.warn('Push API is not supported.');
		} else if (!('Notification' in window)) {
			toast.warn('Notifications API is not supported.');
		} else if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
			toast.warn('Notifications are not supported.');
			// Check permission
		} else if (Notification.permission == 'denied') {
			toast.warn('Notifications are disabled.');
		} else {
			Notification.requestPermission().then(async (permission) => {
				if (permission === 'granted') {
					//If notification is allowed
					// create token
					await createToken(setFCMToken);
	
					// foreground notification
					receiveMessage(addNoti);
				} else {
					//If notification is not allowed
					toast.warn(
						'Your notification permission was blocked. Please grant this permission to use this app!'
					);
				}
			});
		}
	}, [addNoti, setFCMToken]);

	useEffect(() => {
		const newCount = noties && noties?.filter((v) => !v.isSeen).length;
		setCount(newCount);
	}, [noties]);

	return (
		<div className='flex items-center justify-center w-8 sm:w-12 h-8 sm:h-12'>
			<details className='dropdown dropdown-end' ref={dropdownRef}>
				<summary
					tabIndex='0'
					onClick={handleClickNoti}
					className='relative btn btn-sm btn-circle btn-ghost m-1 list-none cursor-pointer my-auto whitespace-nowrap font-medium text-sm hover:text-accent-focus'>
					{count > 0 && (
						<span className='absolute top-0 right-0 indicator-item badge badge-sm px-1 badge-secondary'>
							{count < 99 ? count : '99+'}
						</span>
					)}
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth='2'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
						/>
					</svg>
				</summary>
				<ul
					tabIndex={0}
					className='z-50 bg-base-100 dropdown-content menu font-normal shadow-2xl rounded-xl w-96'>
					<li className='font-bold border-b border-neutral-focus'>
						<div className='flex justify-center'>
							<span className='text-2xl'>Notifications</span>
							{/* <span>
								<svg
									className='w-6 h-6'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'></path>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'></path>
								</svg>
							</span> */}
						</div>
					</li>
					{!noties || noties?.length === 0 ? (
						<li className='text-center p-4'>No notification</li>
					) : (
						noties?.map((noty, idx) => (
							<li key={`noty-${idx}`}>
								<Link
									href={noty?.link}
									onClick={handleClickNotiItem}
									className='flex items-center text-left'>
									{/* {noty.img && (
									<Image
										width={48}
										height={48}
										className='rounded-full'
										src={noty.img}
										alt={`noty-${idx}`}
									/>
								)} */}
									<div className='flex-1'>{noty.body}</div>
									{!noty?.isSeen && (
										<span className='rounded-full bg-accent p-1'></span>
									)}
								</Link>
							</li>
						))
					)}
				</ul>
			</details>
		</div>
	);
}
