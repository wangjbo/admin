import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../static/css/AdminIndex.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { Route, BrowserRouter as Router } from 'react-router-dom';
import AddArticle from './Article';
import ArticleList from './ArticleList';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
    const [collapsed, setCollapsed] = useState(false)
    const [SecondBreadcrumb,setSecondBreadcrumb]= useState('')

    let onCollapse = collapsed => {
        setCollapsed(collapsed)
    };
    const handleClickArticle = (e) => {
        if (e.key === '3') {
            props.history.push('/index/add')
        } else {
            props.history.push('/index/list')
        }
    }
    const handleCilckAddArticle = () => {
        props.history.push('/index/add/')
    }


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className='leftMenu'>
                    {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
                        工作台
                    </Menu.Item> */}
                    <Menu.Item key="2" onClick={handleCilckAddArticle} icon={<DesktopOutlined />}>
                        添加文章
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />}
                        onClick={handleClickArticle}
                        title="文章管理">
                        <Menu.Item key="3">添加文章</Menu.Item>
                        <Menu.Item key="4">文章列表</Menu.Item>
                        {/* <Menu.Item key="5">Alex</Menu.Item> */}
                    </SubMenu>

                    <Menu.Item key="5" icon={<FileOutlined />}>
                        留言管理
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item></Breadcrumb.Item>
                        <Breadcrumb.Item></Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <div>
                                {/* 组件化的代码，引入addArticle的组件 */}
                                <Route path="/index/" exact component={AddArticle} />
                                <Route path="/index/add/" exact component={AddArticle} />
                                <Route path="/index/add/:id" exact component={AddArticle} />
                                <Route path="/index/list/" component={ArticleList} />
                            </div>
                        </div>
                    </div>

                </Content>
                <Footer style={{ textAlign: 'center' }}>created By wjb @2021 copyright</Footer>
            </Layout>
        </Layout>
    );

}
export default AdminIndex;