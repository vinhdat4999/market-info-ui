import React, {useEffect, useMemo} from "react";
import styles from "./Home.module.scss";
import {Divider, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getMarketInfo} from "../../redux-toolkit/market-info/marketInfoThunk";
import {getIsLoadingState, getMarketDataState} from "../../redux-toolkit/market-info/marketInfoSelector";
import GoldTradingView from "../../components/GoldTradingView/GoldTradingView";
import GoldPriceTable from "./GoldTable/GoldTable";

function Home(): React.JSX.Element {
    const dispatch: any = useDispatch();
    const isLoading = useSelector(getIsLoadingState);
    const marketInfo: any = useSelector(getMarketDataState);

    useEffect(() => {
        dispatch(getMarketInfo());
        const interval = setInterval(() => {
            dispatch(getMarketInfo());
        }, 50000);
        return () => clearInterval(interval);
    }, [dispatch]);

    const dataSource = useMemo(() => {
        const sjcData = marketInfo?.goldData?.SJC;
        const sjcUpdatedTime = sjcData?.updatedTime;
        const sjc1LData = sjcData?.data["Vàng SJC 1L, 10L, 1KG"];
        const sjc1LBuy = sjc1LData?.buy;
        const sjc1LSell = sjc1LData?.sell;

        const sjcRingData = sjcData?.data["Vàng nhẫn SJC 99,99% 1 chỉ, 2 chỉ, 5 chỉ"];
        const sjcRingBuy = sjcRingData?.buy;
        const sjcRingSell = sjcRingData?.sell;

        const dojiData = marketInfo?.goldData?.DOJI;
        const dojiUpdatedTime = dojiData?.updatedTime;
        const dojiRingData = dojiData?.data["nhanhung1chi"];
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
        <>
            {isLoading ? (
                <Spin className={styles["spin"]} size={"large"}/>
            ) : (
                <>
                    <GoldTradingView/>
                    <Divider/>
                    <GoldPriceTable dataSource={dataSource}/>
                </>
            )}
        </>
    );
}

export default Home;
