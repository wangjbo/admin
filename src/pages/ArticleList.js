import React, { useState, useEffect } from 'react'
import '../static/css/ArticleList.css'
import 'antd/dist/antd.css';
import { List, Row, Col, Modal, Tag, Space, message, Button, Switch, Table } from 'antd';
import axios from 'axios'
import servicePath from '../config/apiUrl'
const { confirm } = Modal;



function ArticleList(props) {
    const [data, setData] = useState([])
    const { Column, ColumnGroup } = Table;

    // 获得文章列表
    const getList = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                setData(res.data.list)
            }
        )
    }
    // 删除文章
    const delArticle = (id) => {
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk() {
                console.log(id)
                axios(servicePath.delArticle + id, { withCredentials: true }).then(
                    res => {
                        message.success('文章删除成功')
                        getList()
                    }
                )
            },
            onCancel() {
                message.success('没有任何改变')
            },
        });

    }
    const getArticleById = (id)=>{
        console.log(id)
        props.history.push("/index/add/"+id)
    }
    useEffect(() => {
        getList();
    }, [])

    return (
        <Table dataSource={data}>
            <Column title="文章标题" dataIndex="title" key="title" align='center' />
            {/* <Column title="文章简介" dataIndex="introduce" key="introduce" align='center' /> */}
            <Column title="文章类型" dataIndex="typeName" key="typeName" align='center' />
            <Column title="浏览量" dataIndex="view_count" key="view_count" align='center' />
            <Column title="发布时间" dataIndex="addTime" key="addTime" align='center' />

            <Column
                align='center'
                title="修改/删除"
                key="action"
                render={(text, record) => (
                    <Space size="middle">
                        <Button onClick={() => {
                            delArticle(text.id)
                        }} type='danger'>删除</Button>
                        <Button onClick={() => {
                            getArticleById(text.id)
                        }}>修改</Button>
                    </Space>
                )}
            />
        </Table>
    );

}

export default ArticleList