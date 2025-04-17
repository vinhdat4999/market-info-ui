import React, {useEffect, useMemo, useRef, useState} from "react";
import styles from "./GoldTable.module.scss";
import {InputNumber, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getMarketDataState} from "../../../redux-toolkit/market-info/marketInfoSelector";
import {getMarketInfo} from "../../../redux-toolkit/market-info/marketInfoThunk";
import {DOJI_RING_DATA, SJC_1L_DATA, SJC_RING_DATA} from "../../../constants/common";

const columns = [
    {title: 'Loại vàng', dataIndex: 'name', key: 'name'},
    {title: 'Thời gian cập nhật', dataIndex: 'updatedTime', key: 'updatedTime'},
    {title: 'Giá mua', dataIndex: 'buy', key: 'buy'},
    {title: 'Giá bán', dataIndex: 'sell', key: 'sell'},
];

const GoldPriceTable: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const marketInfo = useSelector(getMarketDataState);
    const [intervalMs, setIntervalMs] = useState<number>(60);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // @ts-ignore
        dispatch(getMarketInfo());

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            // @ts-ignore
            dispatch(getMarketInfo());
        }, intervalMs * 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [dispatch, intervalMs * 1000]);

    const lastUpdatedTime = marketInfo?.source?.generatedTime;

    const dataSource = useMemo(() => {
        const sjcData = marketInfo?.goldData?.SJC;
        const sjcUpdatedTime = sjcData?.updatedTime;
        const sjc1LData = sjcData?.data[SJC_1L_DATA];
        const sjc1LBuy = sjc1LData?.buy;
        const sjc1LSell = sjc1LData?.sell;

        const sjcRingData = sjcData?.data[SJC_RING_DATA];
        const sjcRingBuy = sjcRingData?.buy;
        const sjcRingSell = sjcRingData?.sell;

        const dojiData = marketInfo?.goldData?.DOJI;
        const dojiUpdatedTime = dojiData?.updatedTime;
        const dojiRingData = dojiData?.data[DOJI_RING_DATA];
        const dojiRingBuy = dojiRingData?.buy;
        const dojiRingSell = dojiRingData?.sell;

        return [
            {
                key: '1',
                name: 'SJC vàng miếng',
                updatedTime: sjcUpdatedTime,
                buy: sjc1LBuy,
                sell: sjc1LSell,
            },
            {
                key: '2',
                name: 'SJC vàng nhẫn',
                updatedTime: sjcUpdatedTime,
                buy: sjcRingBuy,
                sell: sjcRingSell,
            },
            {
                key: '3',
                name: 'DOJI nhẫn Hưng Thịnh Vượng',
                updatedTime: dojiUpdatedTime,
                buy: dojiRingBuy,
                sell: dojiRingSell,
            },
        ];
    }, [marketInfo]);

    return (
        <div className={styles["wrapper"]}>
            <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                <h2>Cập nhật lần cuối: {lastUpdatedTime}</h2>
                <div className={styles["freq-panel"]}>
                    <p>Tần suất cập nhật (s):{" "}</p>
                    <InputNumber
                        className={styles["input-number-dark"]}
                        min={1}
                        step={1}
                        value={intervalMs}
                        onChange={(value) => value && setIntervalMs(value)}
                    />
                </div>
            </div>

            <Table
                className={styles["table"]}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
        </div>
    );
});

export default GoldPriceTable;
