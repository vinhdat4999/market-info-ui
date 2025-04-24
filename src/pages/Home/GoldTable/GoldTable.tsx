import React, {useEffect, useMemo, useRef, useState} from "react";
import styles from "./GoldTable.module.scss";
import {InputNumber, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    getErrorState,
    getIsLoadingState,
    getMarketDataState
} from "../../../redux-toolkit/market-info/marketInfoSelector";
import {getMarketInfo} from "../../../redux-toolkit/market-info/marketInfoThunk";
import {DOJI_RING_DATA, SJC_1L_DATA, SJC_RING_DATA,} from "../../../constants/common";
import DiffPrice from "./UpdateTime/DiffPrice/DiffPrice";
import Clock from "../../../components/Clock/Clock";

const columns = [
    {title: "Loại vàng", dataIndex: "name", key: "name", width: "23%"},
    {title: "Thời gian cập nhật", dataIndex: "updatedTime", key: "updatedTime", width: "25%"},
    {title: "Giá mua", dataIndex: "buy", key: "buy", width: "26%"},
    {title: "Giá bán", dataIndex: "sell", key: "sell", width: "26%"},
];

const GoldPriceTable: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const marketInfo = useSelector(getMarketDataState);
    const error = useSelector(getErrorState);
    const [intervalMs, setIntervalMs] = useState<number>(60);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const previousPricesRef = useRef<any>(null);

    useEffect(() => {
        const fetchData = () => {
            // @ts-ignore
            dispatch(getMarketInfo());
        };

        fetchData();

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(fetchData, intervalMs * 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [dispatch, intervalMs]);

    const dataSource = useMemo(() => {
        const sjcData = marketInfo?.goldData?.SJC;
        const sjcOldData = previousPricesRef.current?.SJC;
        const dojiData = marketInfo?.goldData?.DOJI;
        const dojiOldData = previousPricesRef.current?.DOJI;

        const sjc1LData = sjcData?.data[SJC_1L_DATA];
        const sjc1LOldData = sjcOldData?.data[SJC_1L_DATA];

        const sjcRingData = sjcData?.data[SJC_RING_DATA];
        const sjcRingOldData = sjcOldData?.data[SJC_RING_DATA];

        const dojiRingData = dojiData?.data[DOJI_RING_DATA];
        const dojiRingOldData = dojiOldData?.data[DOJI_RING_DATA];

        if (marketInfo?.goldData) {
            previousPricesRef.current = marketInfo.goldData;
        }

        return [
            {
                key: "1",
                name: "SJC vàng miếng",
                updatedTime: sjcData?.updatedTime,
                buy: DiffPrice(sjc1LData?.buy, sjc1LOldData?.buy),
                sell: DiffPrice(sjc1LData?.sell, sjc1LOldData?.sell),
            },
            {
                key: "2",
                name: "SJC vàng nhẫn",
                updatedTime: sjcData?.updatedTime,
                buy: DiffPrice(sjcRingData?.buy, sjcRingOldData?.buy),
                sell: DiffPrice(sjcRingData?.sell, sjcRingOldData?.sell),
            },
            {
                key: "3",
                name: "DOJI HTV",
                updatedTime: dojiData?.updatedTime,
                buy: DiffPrice(dojiRingData?.buy, dojiRingOldData?.buy),
                sell: DiffPrice(dojiRingData?.sell, dojiRingOldData?.sell),
            },
        ];
    }, [marketInfo]);

    const lastUpdatedTime = marketInfo?.source?.generatedTime;

    return (
        <div className={styles["wrapper"]}>
            <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                <h2 style={{display: "contents"}}>
                    <Clock/>
                    <span style={{marginLeft: "100px"}}>
                    Cập nhật lần cuối: {lastUpdatedTime}
                </span>
                </h2>
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

                {error && (
                    <h2 style={{color: 'red', fontWeight: 'bold', marginLeft: '1rem'}}>
                        {error}
                    </h2>
                )}
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
