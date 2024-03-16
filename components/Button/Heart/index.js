'use client';
import React, { useEffect, useState } from 'react';
import styles from './Heart.module.css';
import postApi from '@/services/postApi.service';
import commentApi from '@/services/commentApi.service';
import { useUserStore } from '@/store/forum';

export default function Heart({ type = 'post', heart, id, className = '' }) {
	const [isLike, setIsLike] = useState(false);
	const [amount, setAmount] = useState([]);
	const { profile } = useUserStore();

	// mutate -> heart change -> update amount again
	useEffect(() => {
		setAmount(heart);
		return () => setAmount([]);
	}, [heart]);

	useEffect(() => {
		if (amount) {
			const result = amount.some((userLiked) => userLiked?.id === profile?.user_id);
			setIsLike(result);
		}
	}, [profile, amount]);

	const handleLiked = async () => {
		setIsLike(true);
		setAmount((prev) => [
			...prev,
			{
				full_name: profile?.last_name + ' ' + profile?.first_name,
				id: profile?.user_id,
			},
		]);
		let result = null;
		if (type === 'post') {
			result = await postApi.LikePost(id); // for server
		} else {
			result = await commentApi.LikeComment(id); // for server
		}
		if (!result?.status) console.log('liked', result);
	};

	const handleDisLiked = async () => {
		setIsLike(false);
		setAmount((prev) => prev.filter((userLiked) => userLiked?.id !== profile?.user_id));

		let result = null;
		if (type === 'post') {
			result = await postApi.RemoveLikePost(id); // for server
		} else {
			result = await commentApi.RemoveLikeComment(id); // for server
		}
		if (!result?.status) console.log('disliked', result);
	};

	return (
		<button
			onClick={isLike ? handleDisLiked : handleLiked}
			className={`flex-shrink-0 ${className} ${styles.heart} ${
				isLike && styles.is_animating
			} ${isLike && styles.liked}`}>
			<span className='flex justify-end text-base font-normal text-base-content'>
				{amount?.length}
			</span>
		</button>
	);
}
