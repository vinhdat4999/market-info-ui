import React, { ReactNode } from "react";

const DiffPrice = (newVal?: number | string, oldVal?: number | string): ReactNode => {
    const toNumber = (val: number | string | undefined): number | null => {
        if (val == null) return null;
        if (typeof val === "number") return val;
        return Number(val.toString().replace(/,/g, ""));
    };

    const newNum = toNumber(newVal);
    const oldNum = toNumber(oldVal);

    if (newNum == null) return "-";

    const formatted = newNum.toLocaleString("vi-VN");

    if (oldNum == null) return formatted;

    const diff = newNum - oldNum;
    const sign = diff > 0 ? "+" : diff < 0 ? "-" : "";
    const absDiff = Math.abs(diff).toLocaleString("vi-VN");

    const diffStyle = diff > 0 ? { color: "green" } : diff < 0 ? { color: "red" } : {};

    return (
        <>
            {formatted}{" "}
            {diff !== 0 && (
                <span style={diffStyle}>
                    ({sign}
                    {absDiff})
                </span>
            )}
        </>
    );
};

export default DiffPrice;
