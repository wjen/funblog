import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
    let timeAgo = '';
    if (timestamp) {
        const date = parseISO(timestamp);
        console.log('🚀 ~ file: TimeAgo.js:8 ~ TimeAgo ~ date:', date);
        const timePeriod = formatDistanceToNow(date);
        console.log(
            '🚀 ~ file: TimeAgo.js:10 ~ TimeAgo ~ timePeriod:',
            timePeriod
        );
        timeAgo = `${timePeriod} ago`;
    }
    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    );
};

export default TimeAgo;
