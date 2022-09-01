import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import React, { useState } from 'react';
import { UploadUrl, resetImgUrl } from '@/utils/tools'

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
};

const UpLoads = (props) => {
    const [loading, setLoading] = useState(false);
    const { imageUrl, setImageUrl } = props
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
        setLoading(true);
        return;
        }

        if (info.file.status === 'done') {
            setImageUrl(info.file.response.data)
        }
    };

    const uploadButton = (
        <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div
            style={{
            marginTop: 8,
            }}
        >
            Upload
        </div>
        </div>
    );
    return (
        <Upload
            // name表示文件服务器接收的名称
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // 表示服务器接收的地址
            action={ UploadUrl }
            // beforeUpload={beforeUpload}
            onChange={handleChange}
        >
        {imageUrl ? (
            <img
            src={resetImgUrl(imageUrl)}
            alt="avatar"
            style={{
                width: '100%',
            }}
            />
        ) : (
            uploadButton
        )}
        </Upload>
    );
};

export default UpLoads;