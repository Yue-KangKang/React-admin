import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    RetweetOutlined
} from '@ant-design/icons';

export const items = [
    getItem('图表', '/admin/charts', <PieChartOutlined />),
    getItem('商品', '/admin/product', <DesktopOutlined />),
    getItem('轮播图', '/admin/bannercategory', <RetweetOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}