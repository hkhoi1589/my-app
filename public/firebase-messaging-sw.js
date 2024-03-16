// Scripts for firebase and firebase messaging
importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@6/dist/umd.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background notifications will be received here
messaging.onBackgroundMessage(async (message) => {
	// save to indexdb, no matter what
	const response = await idbKeyval.get('forumNoti');

	if (response) {
		const oldNoti = JSON.parse(response);
		const { noties } = oldNoti.state;
		console.log('onBackgroundMessage', message);
		console.log('oldNoti', oldNoti);

		const newNoti = [
			{
				link: message.notification.link,
				img: message.notification.image,
				title: message.notification.title,
				body: message.notification.body,
				isSeen: false,
			},
			...noties,
		];
		await idbKeyval.set(
			'forumNoti',
			JSON.stringify({
				state: {
					noties: newNoti,
					...oldNoti.state,
				},
			})
		);
	} else {
		console.log('onBackgroundMessage', message);

		const newNoti = [
			{
				link: message.notification.link,
				img: message.notification.image,
				title: message.notification.title,
				body: message.notification.body,
				isSeen: false,
			},
		];
		await idbKeyval.set(
			'forumNoti',
			JSON.stringify({
				state: {
					noties: newNoti,
				},
			})
		);
	}

	self.registration.showNotification(message.notification.title, {
		body: message.notification.body,
		icon: '/img/svg/logo.svg',
	});
});
