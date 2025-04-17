import React from 'react';
import {HomeOutlined} from '@ant-design/icons';
import {Button, Divider, Row, Space} from 'antd';
import {useNavigate} from 'react-router-dom';

function NotFound(): React.JSX.Element {
    const navigate = useNavigate();

    const onClickGoHome = () => {
        navigate('/');
    };

    return (
        <>
            <div>
                <h2 style={{textAlign: "center"}}>Không tìm thấy trang</h2>
                <Divider/>
                <Row justify="center">
                    <p style={{textAlign: "center", fontSize: "16px"}}>
                        Trang bạn đang tìm không tồn tại hoặc đã bị xóa.
                    </p>
                </Row>
                <Row justify="center">
                    <Space style={{marginTop: "20px"}}>
                        <Button
                            title="Về trang chủ"
                            onClick={onClickGoHome}
                            icon={<HomeOutlined/>}
                        />
                    </Space>
                </Row>
            </div>
        </>
    );
}

export default NotFound;
