import React, {useEffect, useState} from 'react';

const Clock: React.FC = () => {
    const formatDateTime = (): string => {
        const now = new Date();

        const localTime = new Date(
            now.toLocaleString('en-US', {timeZone: 'Asia/Bangkok'})
        );

        const pad = (num: number): string => num.toString().padStart(2, '0');

        const day = pad(localTime.getDate());
        const month = pad(localTime.getMonth() + 1);
        const year = localTime.getFullYear();

        const hours = pad(localTime.getHours());
        const minutes = pad(localTime.getMinutes());
        const seconds = pad(localTime.getSeconds());

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    const [dateTime, setDateTime] = useState<string>(formatDateTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(formatDateTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p>{dateTime}</p>
        </div>
    );
};

export default Clock;
