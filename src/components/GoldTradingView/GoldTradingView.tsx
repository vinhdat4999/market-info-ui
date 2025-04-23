import React, { useEffect, useRef, useState } from "react";
import { Switch } from "antd";

const GoldTradingView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showWidget, setShowWidget] = useState(true);

  useEffect(() => {
    if (!showWidget) return;

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
          timezone: "Asia/Bangkok",
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

    return () => {
      containerRef.current?.replaceChildren();
    };
  }, [showWidget]);

  const onSwitchChange = (checked: boolean) => {
    setShowWidget(checked);
  };

  return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Switch checked={showWidget} onChange={onSwitchChange} />
          <span style={{ marginLeft: 8 }}>
                    {showWidget ? "Hide Gold Chart" : "Show Gold Chart"}
                </span>
        </div>

        {showWidget && (
            <div className="tradingview-widget-container" ref={containerRef}>
              <div id="tradingview_xauusd" />
            </div>
        )}
      </div>
  );
};

export default GoldTradingView;
