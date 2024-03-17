'use client';
import { useUserStore } from '@/store/forum';
import { API, CLIENT_ID, CLIENT_SECRET } from '@/utils/constant';
import fetcher from '@/utils/fetcher';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function LoginForm() {
	const { setAccess, setRefresh, access, setProfile } = useUserStore();
	const [err, setErr] = useState('');

	const router = useRouter();

	// get message error
	const searchParams = useSearchParams();
	const msg = searchParams.get('msg');

	useEffect(() => {
		if (msg === 'forum') toast.warn('Please login to use this forum!');
	}, [msg]);

	useEffect(() => {
		if (access) router.push('/forum/');
	}, [access, router]);

	// prevent submitting invalid or empty emails
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// const onSubmit = async (input) => {
	// 	const data = await fetcher(`${API}/oauth2/token/`, 'POST', {
	// 		email: input.email,
	// 		password: input.password,
	// 		grant_type: input.password ? 'password' : 'refresh_token',
	// 		client_id: CLIENT_ID,
	// 		client_secret: CLIENT_SECRET,
	// 	});

	// 	if (data && !data.error) {
	// 		setAccess(data.access_token);
	// 		setRefresh(data.refresh_token);
	// 		const me = await fetcher(`${API}/api/v1/userprofile/me`, 'GET');

	// 		if (me.status) {
	// 			const obj = me?.data || {};
	// 			const decoded = jwtDecode(data.access_token);

	// 			setProfile({
	// 				...obj,
	// 				school_id: decoded.school_id,
	// 				school_roles: decoded.school_roles,
	// 				user_id: decoded.user_id,
	// 				expire: decoded.exp - decoded.iat, // Time remaining (second)
	// 			});
	// 		}
	// 	} else {
	// 		setErr(data.error_description || data.error);
	// 	}
	// };
	return (
		<form
			onSubmit={handleSubmit((input) => signIn(input))}
			className='max-w-xl bg-base-100 mx-auto mt-12 rounded-lg overflow-hidden p-12 sm:py-20 sm:px-24 space-y-6'>
			<h2 className='text-2xl font-bold text-center'>We’ve missed you!</h2>
			<p className='text-lg'>
				More than 150 questions are waiting for your wise suggestions!
			</p>
			<div>
				<div className='form-control w-full'>
					<label className='label pt-0 pb-1'>
						<span className='label-text'>Username</span>
					</label>
					<input
						className='input input-bordered w-full'
						type='text'
						{...register('email', { required: 'This field is required' })}
					/>
				</div>
				{errors.email && <div className='text-error'>{errors.email.message}</div>}
			</div>
			<div>
				<div className='form-control w-full'>
					<label className='label pt-0 pb-1'>
						<span className='label-text'>Password</span>
					</label>
					<input
						className='input input-bordered w-full'
						type='password'
						{...register('password', { required: 'This field is required' })}
					/>
				</div>
				{errors.password && <div className='text-error'>{errors.password.message}</div>}
			</div>
			<div className='pt-2'>
				<button className='btn btn-primary w-full'>Login</button>
			</div>

			{err && <div className='text-error'>{err}</div>}
			<Link className='link link-hover block' href='/auth/forgot-password'>
				Forgot password?
			</Link>
		</form>
	);
}
