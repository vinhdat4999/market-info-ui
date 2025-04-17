import React from "react";
import GoldPriceTable from "./GoldTable/GoldTable";
import GoldTradingView from "../../components/GoldTradingView/GoldTradingView";

function Home(): React.JSX.Element {

    return (
        <>
            <GoldTradingView/>
            <GoldPriceTable/>
        </>
    );
}

export default Home;
