import {useEffect, useRef} from "react";

const GoldTradingView = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;

        script.onload = () => {
            if ((window as any).TradingView) {
                new (window as any).TradingView.widget({
                    width: "100%",
                    height: "550",
                    symbol: "OANDA:XAUUSD",
                    interval: "60",
                    timezone: "Asia/Bangkok", // GMT+7
                    theme: "dark",
                    style: "1",
                    locale: "en",
                    toolbar_bg: "#f1f3f6",
                    enable_publishing: false,
                    allow_symbol_change: false,
                    container_id: "tradingview_xauusd",
                });
            }
        };

        containerRef.current?.appendChild(script);
    }, []);

    return (
        <div className="tradingview-widget-container" ref={containerRef}>
            <div id="tradingview_xauusd"/>
        </div>
    );
};

export default GoldTradingView;
