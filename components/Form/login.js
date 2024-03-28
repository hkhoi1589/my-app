'use client';
import { useUserStore } from '@/store/forum';
import { API, CLIENT_ID, CLIENT_SECRET } from '@/utils/constant';
import fetcher from '@/utils/fetcher';
import { jwtDecode } from 'jwt-decode';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function LoginForm() {
	const { data: session } = useSession();

	if (session && session.user) {
		console.log('session.user', session?.user);
		return <button onClick={() => signOut()}>{session.user.name} Sign Out</button>;
	}

	return <button onClick={() => signIn()}>SignIn</button>;
}
