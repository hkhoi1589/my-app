import { useEffect, useRef, useState } from 'react';

export default function (ref) {
	const [isOnScreen, setIsOnScreen] = useState(false);
	const observerRef = useRef(null);

	useEffect(() => {
		observerRef.current = new IntersectionObserver(([entry]) =>
		setIsOnScreen(entry.isIntersecting)
		);
	}, []);

	useEffect(() => {
		observerRef.current.observe(ref.current);

		return () => {
		observerRef.current.disconnect();
		};
	}, [ref]);

	return isOnScreen;
}
