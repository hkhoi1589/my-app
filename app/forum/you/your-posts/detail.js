'use client';
import PostList from '@/components/search/post/list';
import { useUserStore } from '@/store/forum';

export default function Detail() {
	const { profile } = useUserStore();
	const src = `/api/v1/users/${profile.user_id}/posts`;

	return <PostList src={src} loader={true} limit={10} fill={true} />;
}
