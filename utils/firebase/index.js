import schoolApi from '@/services/schoolApi.service';
import storage from '@/store/storage';
import { deleteToken, getMessaging, getToken, onMessage } from 'firebase/messaging';
import { toast } from 'react-toastify';

export const createToken = async (onSuccess) => {
	// check fcmToken is existed?
	const json = await storage.getItem('forumNoti');
	if (json) {
		const data = JSON.parse(json);
		const { fcmToken } = data?.state;
		return fcmToken; // break
	}

	const messaging = getMessaging();
	try {
		// Getting token from FCM'
		const fcmToken = await getToken(messaging, {
			vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
		});

		if (fcmToken) {
			//console.log('token', fcmToken);
			// send to server
			const result = await schoolApi.RegistrationDeviceNotification(fcmToken);
			if (result?.status) {
				console.log('Sent fcmToken succesfully');
			} else {
				console.log(result?.error);
			}

			onSuccess(fcmToken); // save to indexDb
		} else {
			// Show permission request UI
			//console.log('No registration token available. Request permission to generate one.');
			toast.warn('No registration token available. Request permission to generate one.');
		}
	} catch (error) {
		//console.log('An error occurred while retrieving token. ', error);
	}
};

// export const getSubscription = async () => {
// 	if (!navigator) return;
// 	const subscriptions = navigator.serviceWorker.getRegistrations().then((r) => {
// 		return r.map((sw) => {
// 			if (!(sw.active && sw.active.scriptURL.includes('firebase-messaging')))
// 				return Promise.resolve();
// 			return sw.pushManager.getSubscription();
// 		});
// 	});
// 	const arr = await subscriptions;
// 	return await (arr ? arr[0] : Promise.resolve(null));
// };

// export const unSubscriptionServiceWorker = async () => {
// 	navigator.serviceWorker.getRegistrations().then((r) => {
// 		return Promise.all(r.map(reg => reg.unregister()));
// 	});
// };

export const removeServiceWorker = async () => {
	const messaging = getMessaging();
	try {
		await deleteToken(messaging);
		const json = await storage.getItem('forumNoti');
		if (json) {
			const data = JSON.parse(json);
			const { fcmToken } = data?.state;
			const result = await schoolApi.DestroyFCMToken(fcmToken);
			if (!result?.status) console.log(result?.error);
		}
	} catch (error) {
		console.log('Unable to delete token. ', error);
	}
};

export const receiveMessage = (onSuccess) => {
	const messaging = getMessaging();
	onMessage(messaging, (payload) => {
		console.log('initForegroundMessage', payload);
		onSuccess(payload);
	});
};
