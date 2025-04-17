import React, {useEffect, useMemo, useState} from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const UpdatedTime: React.FC<{ updatedAt: string }> = ({updatedAt}) => {
    const [timeElapsed, setTimeElapsed] = useState(dayjs(updatedAt, "DD/MM/YYYY HH:mm:ss"));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeElapsed(dayjs(updatedAt, "DD/MM/YYYY HH:mm:ss"));
        }, 1000);

        return () => clearInterval(interval);
    }, [updatedAt]);

    const displayTime = useMemo(() => {
        const now = dayjs();
        const diffSeconds = now.diff(timeElapsed, "second") - 1;
        const formatted = timeElapsed.format("HH:mm:ss");
        let suffix = "";

        if (diffSeconds < 60) {
            suffix = `(${diffSeconds} giây trước)`;
        } else if (diffSeconds < 3600) {
            const minutes = Math.floor(diffSeconds / 60);
            suffix = `(${minutes} phút trước)`;
        } else {
            const hours = Math.floor(diffSeconds / 3600);
            suffix = `(${hours} giờ trước)`;
        }

        return `${formatted} ${suffix}`;
    }, [timeElapsed]);

    return <h1>Cập nhật lần cuối: {displayTime}</h1>;
};

export default UpdatedTime;
