import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(relativeTime);

export const formatDate = (val, type = 'DD/MM/YYYY hh:mm:ssA') => {
	return dayjs(val || '').format(type);
};

export const formatTimeAgo = (val) => {
	return dayjs(val || '').fromNow();
};

export const formatUTC = (val) => {
	return dayjs(val || '')
		.utc()
		.format();
};

export default dayjs;
