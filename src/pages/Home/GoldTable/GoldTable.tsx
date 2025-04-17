import React from "react";
import styles from "./GoldTable.module.scss";
import {Table} from "antd";

interface Props {
    dataSource: any[];
}

const columns = [
    {
        title: 'Loại vàng',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Thời gian cập nhật',
        dataIndex: 'updatedTime',
        key: 'updatedTime',
    },
    {
        title: 'Giá mua',
        dataIndex: 'buy',
        key: 'buy',
    },
    {
        title: 'Giá bán',
        dataIndex: 'sell',
        key: 'sell',
    },
];

const GoldPriceTable: React.FC<Props> = React.memo(({dataSource}) => {
    return (
        <div className={styles["wrapper"]}>
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
