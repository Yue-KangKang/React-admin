/* eslint-disable */

import React, { useState } from 'react';
import { items } from './HomeData';
import './Home.css';
import Charts from './Charts/Charts';
import Product from './Products/Product'
import {
    Breadcrumb,
    Layout,
    Menu
} from 'antd';
import {
    useHistory,
    Route
} from 'react-router-dom'
const {
    Header,
    Content,
    Footer,
    Sider
} = Layout;

function HomeIndex() {
    const { push } = useHistory()
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout
            style={{
                minHeight: '100vh',
        }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }) => { push(key) }} />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                <Breadcrumb
                    style={{
                    margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    className="site-layout-background"
                    style={{
                    padding: 24,
                    minHeight: 360,
                    }}
                >
                    <Route path='/admin/charts' exact>
                        <Charts />
                    </Route>
                    <Route path='/admin/product'>
                        <Product />
                    </Route>
                </div>
                </Content>
                <Footer
                style={{
                    textAlign: 'center',
                }}
                >
                Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}

export default HomeIndex