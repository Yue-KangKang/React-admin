import React, { useEffect, useState } from 'react';
import {
    Table,
    Button,
    Card,
    message,
    Space,
    Modal,
    Form,
    Input,
    Upload,
    Radio,
    Popconfirm
} from 'antd';
import {
    DeleteAPI,
    ProductsAPI,
    GetProductAPI,
    AmendProductAPI,
    UploadModalAPI,
} from '../../../services/auth';
import {
    PlusOutlined,
    DeleteOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { resetImgUrl } from '../../../utils/tools';


export default function Product() {
    const [dataSource, setDataSource] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [visible, setVisible] = useState(false);
    const [currentID, setCurrentID] = useState(-1);
    // 定义一个标识位，如果currentID > -1时，进行添加，如果不大于就进行修改;
    const [myForm] = Form.useForm();  //创建一个表单实例

    useEffect(() => {
        loadData();
    }, [page]);

    const loadData = () => {
        ProductsAPI(page).then((res) => {
            setDataSource(res.data) // 商品详情数据
            setTotal(res.total) // 商品总数量
        })
    };

    useEffect(() => {
        if (!visible) {
            setCurrentID(-1);
        }
    }, [visible]);

    const columns = [
    {
        title: '序号',
        align: 'center',
        render: (cData, rData, index) => {
            return index + 1;
        }
    },
    {
        key: 'name',
        title: '商品名称',
        dataIndex: 'name',
        align:'center',
    },
    {
        key: 'desc',
        title: '描述信息',
        dataIndex: 'desc',
        align:'center',
        render: (cData) => {
            return cData === '' ? '-' : cData;
        }
    },
    {
        title: '图片',
        dataIndex: 'coverImage',
        key: 'coverImage',
        align:'center',
        render: (_, rData) => <img src={resetImgUrl(rData.coverImage)} style={{ width: '100px', height: '100px' }} />
    },
    {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        align:'center',
    },
    {
        title: '浏览次数',
        dataIndex: 'views',
        align:'center',
        key: 'views',
    },
    {
        title: '是否在售',
        dataIndex: 'onSale',
        align:'center',
        key: 'onSale',
        render: (cData) => {
            return cData === 0 ? <span>在售</span> : <span>待售</span>;
        }
    },
    {
        title: '库存',
        dataIndex: 'amount',
        align:'center',
        key: 'amount',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        align:'center',
        key: 'operation',
        render: (_, rData) =>
                <Space>
                    <Button
                        type='primary'
                        icon={<EditOutlined />}
                        onClick={() =>
                        onAmend(rData)} />
                    <Popconfirm
                        title="确定要删除吗"
                        okText="是"
                        cancelText="否"
                        onConfirm={async () => {
                            await DeleteAPI(rData.id);
                            message.success('删除成功');
                            loadData();
                            }}>
                        <Button icon={ <DeleteOutlined />} type='primary' danger />
                    </Popconfirm>
                </Space>
        }];

    // 修改
    const onAmend = async (rData) => {
        const res = await AmendProductAPI(rData.id);
        setCurrentID(rData.id);
        myForm.setFieldsValue(res); // setFieldsValue 设置form表单的默认值
        setVisible(true);
    }

    const onFinishFailed = (values) => {
        console.log(values);
    }

    return (
        <Card
            extra={<Button icon={<PlusOutlined />}
            type='primary'
            onClick={() => {
                setVisible(true);
        }} />}>
            <Table
                columns={columns}
                rowKey='id'
                dataSource={dataSource}
                pagination={{
                    total, onChange: (page) => { 
                    setPage(page);
                }, showSizeChanger: false
            }} />
            <Modal
                visible={visible}
                title='新增商品'
                okText='确定'
                cancelText='取消'
                onCancel={() => { setVisible(false) }}
                onOk={() => {
                    myForm.submit();
                }}
                maskClosable={false}
                destroyOnClose={ true }
            >
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    form={myForm}
                    onFinish={async (values) => {
                        if (currentID > -1) {
                            await UploadModalAPI(currentID,values)
                        } else {
                            await GetProductAPI(values)
                        }
                        message.success('保存成功');
                        loadData();
                        setVisible(false)
                    }}
                    onFinishFailed={onFinishFailed}
                    preserve={ false }
                >
                    <Form.Item label='商品名称' name='name' rules = {[{required:true,message: '请输入商品名称!'}]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label='描述信息' name='desc' rules = {[{required:true,message: '请输入描述信息!'}]} >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item label='图片' name='coverImage' rules = {[{required:true,message: '请上传图片!'}]} >
                        <Upload action="/upload.do" listType="picture-card">
                            <div>
                                <PlusOutlined />
                                <div
                                style={{
                                    marginTop: 8,
                                }}
                                >
                                Upload
                                </div>
                            </div>
                        </Upload>
                    </Form.Item> */}
                    <Form.Item label='价格' name='price' rules = {[{required:true,message: '请输入价格!'}]} >
                        <Input  type='number'/>
                    </Form.Item>
                    <Form.Item label='是否在售' name='onSale' rules = {[{required:true,message: '请点击是否在售!'}]} >
                        <Radio.Group>
                            <Radio value={ 0 }>
                                在售
                            </Radio>
                            <Radio value={ 1 }>
                                待售
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label='库存' name='amount' rules = {[{required:true,message: '请输入库存!'}]} >
                        <Input type='number'/>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    )
};